import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { ChevronLeft, CreditCard, LoaderCircle, Pencil, Plus, Trash2, X } from 'lucide-react'
import { toast } from 'react-toastify'
import FormField from '../components/FormField'
import { getApiErrorMessage } from '../api/axiosInstance'
import {
  createCreditCard,
  deleteCreditCard,
  fetchCreditCards,
  updateCreditCard,
} from '../store/actions/clientActions'
import { createOrder, setAddress, setCart, setPayment } from '../store/actions/shoppingCartActions'
import { calculateOrderSummary } from '../utils/order'
import { formatPrice } from '../utils/products'
import {
  formatCardNumber,
  formatExpiry,
  getExpiryYears,
  isExpired,
  isValidCardNumber,
  maskCardNumber,
  normalizeCardNumber,
} from '../utils/cards'

const inputClass =
  'w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100'

const EMPTY_FORM = { card_no: '', expire_month: '', expire_year: '', name_on_card: '' }

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)

// Backend taksit endpoint'i sunmuyor; yalnizca gorsel secenek.
const INSTALLMENT_OPTIONS = [
  { value: 'single', label: 'Tek cekim' },
  { value: '3', label: '3 taksit' },
  { value: '6', label: '6 taksit' },
]

function CheckoutPaymentPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const creditCards = useSelector((state) => state.client.creditCards)
  const cart = useSelector((state) => state.shoppingCart.cart)
  const selectedAddress = useSelector((state) => state.shoppingCart.address)
  const selectedPayment = useSelector((state) => state.shoppingCart.payment)

  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [installment, setInstallment] = useState('single')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  // Siparis sonrasi adres/kart secimi temizlenirken asagidaki Redirect'in
  // devreye girip kullaniciyi Step 1'e atmasini engeller.
  const orderCompletedRef = useRef(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur', defaultValues: EMPTY_FORM })

  // CVV kart formundan ayri, yalnizca siparis submit'i icin tutulur.
  // Redux'a, localStorage'a veya kart CRUD API'sine gitmez.
  const {
    register: registerOrder,
    handleSubmit: handleOrderSubmit,
    reset: resetOrder,
    watch: watchOrder,
    formState: { errors: orderErrors },
  } = useForm({ mode: 'onBlur', defaultValues: { card_ccv: '' } })

  const hasAddress = Boolean(selectedAddress?.id)

  useEffect(() => {
    if (!hasAddress) return undefined

    let isActive = true

    dispatch(fetchCreditCards())
      .then(() => {
        if (isActive) setLoadError('')
      })
      .catch((error) => {
        if (isActive) setLoadError(getApiErrorMessage(error, 'Kartlar yuklenemedi.'))
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [dispatch, hasAddress])

  // Secili kart listeden silindiyse odeme secimini guvenli sekilde temizle
  useEffect(() => {
    if (!selectedPayment?.id) return
    const stillExists = creditCards.some((card) => card.id === selectedPayment.id)
    if (!stillExists) dispatch(setPayment({}))
  }, [creditCards, selectedPayment, dispatch])

  // Adres secilmeden bu adima gelinemez; checkout sirasi korunur.
  if (!hasAddress && !orderCompletedRef.current) return <Redirect to="/checkout/address" />

  const openCreateForm = () => {
    setEditingId(null)
    reset(EMPTY_FORM)
    setIsFormOpen(true)
  }

  const openEditForm = (card) => {
    setEditingId(card.id)
    reset({
      card_no: formatCardNumber(card.card_no ?? ''),
      expire_month: String(card.expire_month ?? ''),
      expire_year: String(card.expire_year ?? ''),
      name_on_card: card.name_on_card ?? '',
    })
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingId(null)
    reset(EMPTY_FORM)
  }

  const onSubmit = async (values) => {
    // API'ye normalize edilmis (bosluksuz) gercek kart numarasi gider
    const payload = {
      card_no: normalizeCardNumber(values.card_no),
      expire_month: Number(values.expire_month),
      expire_year: Number(values.expire_year),
      name_on_card: values.name_on_card.trim(),
    }

    try {
      if (editingId) {
        await dispatch(updateCreditCard({ id: editingId, ...payload }))
        toast.success('Kart guncellendi.')
      } else {
        await dispatch(createCreditCard(payload))
        toast.success('Kart eklendi.')
      }
      closeForm()
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Kart kaydedilemedi.'))
    }
  }

  const handleDelete = async (cardId) => {
    setDeletingId(cardId)
    try {
      await dispatch(deleteCreditCard(cardId))
      toast.success('Kart silindi.')
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Kart silinemedi.'))
    } finally {
      setDeletingId(null)
    }
  }

  const hasSelection = Boolean(selectedPayment?.id)
  const watchedMonth = watch('expire_month')
  const watchedYear = watch('expire_year')

  // Siparise yalnizca sepette isaretli (checked) urunler girer.
  const checkedItems = cart.filter((item) => item?.checked)
  const { grandTotal } = calculateOrderSummary(cart)
  const isCvvValid = /^\d{3,4}$/.test(String(watchOrder('card_ccv') ?? '').trim())
  const canPlaceOrder = hasSelection && checkedItems.length > 0 && isCvvValid && !isPlacingOrder

  const onPlaceOrder = async (values) => {
    // Cift gonderim korumasi
    if (isPlacingOrder) return
    if (!selectedAddress?.id || !selectedPayment?.id || checkedItems.length === 0) return

    // ONEMLI: kart API'si name_on_card kullanir, /order payload'i card_name bekler.
    const payload = {
      address_id: selectedAddress.id,
      order_date: new Date().toISOString(),
      card_no: normalizeCardNumber(selectedPayment.card_no),
      card_name: String(selectedPayment.name_on_card ?? '').trim(),
      card_expire_month: Number(selectedPayment.expire_month),
      card_expire_year: Number(selectedPayment.expire_year),
      card_ccv: Number(values.card_ccv),
      price: Number(grandTotal.toFixed(2)),
      products: checkedItems.map((item) => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.product?.name ?? '',
      })),
    }

    setIsPlacingOrder(true)
    try {
      await dispatch(createOrder(payload))

      // CVV'yi ilk is olarak form state'inden temizle.
      resetOrder({ card_ccv: '' })
      orderCompletedRef.current = true

      // Checkout state'i sifirlanir: sepet bosalir, adres ve kart secimi kalkar.
      dispatch(setCart([]))
      dispatch(setAddress({}))
      dispatch(setPayment({}))

      toast.success('Siparisiniz olusturuldu.')
      history.replace('/shop')
    } catch (error) {
      // Hata durumunda sepet/adres/kart korunur, kullanici sayfada kalir.
      toast.error(getApiErrorMessage(error, 'Siparis olusturulamadi. Lutfen tekrar deneyin.'))
    } finally {
      setIsPlacingOrder(false)
    }
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 py-10 md:py-16">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-primary">Step 2 / 2</p>
          <h1 className="text-2xl font-bold text-dark md:text-3xl">Odeme Bilgileri</h1>
          <p className="text-sm text-muted">
            Teslimat adresi: {selectedAddress.title} — {selectedAddress.city}
          </p>
        </div>

        {isLoading && (
          <div
            data-testid="card-loading"
            className="flex items-center justify-center gap-2 py-16 text-sm font-bold text-muted"
          >
            <LoaderCircle size={20} className="animate-spin" aria-hidden="true" />
            Kartlar yukleniyor...
          </div>
        )}

        {!isLoading && loadError && (
          <p
            role="alert"
            data-testid="card-error"
            className="py-16 text-center text-sm font-bold text-danger"
          >
            {loadError}
          </p>
        )}

        {!isLoading && !loadError && (
          <div className="flex flex-col gap-6">
            {creditCards.length === 0 ? (
              <p
                data-testid="card-empty"
                className="border border-dashed border-gray-300 bg-light py-10 text-center text-sm font-bold text-muted"
              >
                Kayitli kartiniz yok. Yeni bir kart ekleyin.
              </p>
            ) : (
              <ul className="flex flex-col gap-4 md:flex-row md:flex-wrap" data-testid="card-list">
                {creditCards.map((card) => (
                  <li
                    key={card.id}
                    data-testid="card-item"
                    data-card-id={card.id}
                    className={`flex w-full flex-col gap-3 border p-4 md:w-[calc(50%-0.5rem)] ${
                      selectedPayment?.id === card.id
                        ? 'border-primary bg-light'
                        : 'border-gray-200'
                    }`}
                  >
                    <label className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="selectedCard"
                        data-testid="card-radio"
                        checked={selectedPayment?.id === card.id}
                        onChange={() => dispatch(setPayment(card))}
                        className="mt-1 h-4 w-4 shrink-0 accent-primary"
                      />
                      <span className="flex flex-col gap-1">
                        <span className="flex items-center gap-2 text-sm font-bold text-dark">
                          <CreditCard size={16} aria-hidden="true" />
                          <span data-testid="masked-card">{maskCardNumber(card.card_no)}</span>
                        </span>
                        <span className="text-sm text-muted">{card.name_on_card}</span>
                        <span className="text-sm text-muted">
                          Son kullanma: {formatExpiry(card.expire_month, card.expire_year)}
                        </span>
                      </span>
                    </label>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        data-testid="card-edit"
                        onClick={() => openEditForm(card)}
                        className="flex items-center gap-1 text-sm font-bold text-primary"
                      >
                        <Pencil size={14} aria-hidden="true" />
                        Duzenle
                      </button>
                      <button
                        type="button"
                        data-testid="card-delete"
                        disabled={deletingId === card.id}
                        onClick={() => handleDelete(card.id)}
                        className="flex items-center gap-1 text-sm font-bold text-muted hover:text-danger disabled:opacity-50"
                      >
                        {deletingId === card.id ? (
                          <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />
                        ) : (
                          <Trash2 size={14} aria-hidden="true" />
                        )}
                        Sil
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {!isFormOpen && (
              <button
                type="button"
                data-testid="add-card"
                onClick={openCreateForm}
                className="flex items-center justify-center gap-2 self-start rounded border border-primary px-6 py-3 text-sm font-bold text-primary"
              >
                <Plus size={16} aria-hidden="true" />
                Yeni kart ekle
              </button>
            )}

            {isFormOpen && (
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                data-testid="card-form"
                className="flex flex-col gap-5 border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-dark">
                    {editingId ? 'Karti duzenle' : 'Yeni kart'}
                  </h2>
                  <button
                    type="button"
                    aria-label="Formu kapat"
                    onClick={closeForm}
                    className="text-muted hover:text-dark"
                  >
                    <X size={18} />
                  </button>
                </div>

                <FormField
                  id="card_no"
                  label="Card Number"
                  error={errors.card_no?.message}
                  hint="Bosluklu yazabilirsiniz; kaydedilirken otomatik duzenlenir."
                >
                  <input
                    id="card_no"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    className={inputClass}
                    {...register('card_no', {
                      required: 'Kart numarasi zorunludur.',
                      validate: (value) =>
                        isValidCardNumber(value) || 'Gecerli bir kart numarasi giriniz.',
                      onChange: (event) =>
                        setValue('card_no', formatCardNumber(event.target.value)),
                    })}
                  />
                </FormField>

                <FormField
                  id="name_on_card"
                  label="Name on Card"
                  error={errors.name_on_card?.message}
                >
                  <input
                    id="name_on_card"
                    autoComplete="cc-name"
                    className={inputClass}
                    {...register('name_on_card', {
                      required: 'Kart uzerindeki isim zorunludur.',
                      minLength: { value: 3, message: 'En az 3 karakter olmalidir.' },
                    })}
                  />
                </FormField>

                <div className="flex flex-col gap-5 md:flex-row md:gap-4">
                  <FormField
                    id="expire_month"
                    label="Expiration Month"
                    error={errors.expire_month?.message}
                  >
                    <select
                      id="expire_month"
                      className={inputClass}
                      {...register('expire_month', {
                        required: 'Ay seciniz.',
                        validate: () =>
                          !isExpired(watchedMonth, watchedYear) ||
                          'Son kullanma tarihi gecmis olamaz.',
                      })}
                    >
                      <option value="">Ay</option>
                      {MONTHS.map((month) => (
                        <option key={month} value={month}>
                          {String(month).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField
                    id="expire_year"
                    label="Expiration Year"
                    error={errors.expire_year?.message}
                  >
                    <select
                      id="expire_year"
                      className={inputClass}
                      {...register('expire_year', { required: 'Yil seciniz.' })}
                    >
                      <option value="">Yil</option>
                      {getExpiryYears().map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <button
                  type="submit"
                  data-testid="card-submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 self-start rounded bg-primary px-8 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting && (
                    <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                  )}
                  {editingId ? 'Guncelle' : 'Kaydet'}
                </button>
              </form>
            )}

            <form
              noValidate
              data-testid="order-form"
              onSubmit={handleOrderSubmit(onPlaceOrder)}
              className="flex flex-col gap-6"
            >
              {/* Taksit secenekleri yalnizca gorsel; backend taksit endpoint'i sunmuyor. */}
              {hasSelection && (
                <div className="flex flex-col gap-3" data-testid="installment-options">
                  <p className="text-sm font-bold text-dark">Odeme secenekleri</p>
                  <div className="flex flex-col gap-2 md:flex-row md:gap-6">
                    {INSTALLMENT_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <input
                          type="radio"
                          name="installment"
                          value={option.value}
                          checked={installment === option.value}
                          onChange={(event) => setInstallment(event.target.value)}
                          className="h-4 w-4 accent-primary"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* CVV yalnizca siparis isteginde kullanilir, hicbir yerde saklanmaz. */}
              {hasSelection && (
                <div className="md:max-w-xs">
                  <FormField id="card_ccv" label="CVV" error={orderErrors.card_ccv?.message}>
                    <input
                      id="card_ccv"
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      autoComplete="cc-csc"
                      data-testid="card-ccv"
                      className={inputClass}
                      {...registerOrder('card_ccv', {
                        required: 'CVV zorunludur.',
                        pattern: {
                          value: /^\d{3,4}$/,
                          message: 'CVV 3 veya 4 haneli olmalidir.',
                        },
                      })}
                    />
                  </FormField>
                </div>
              )}

              {checkedItems.length === 0 && (
                <p
                  role="alert"
                  data-testid="no-checked-items"
                  className="border border-dashed border-gray-300 bg-light p-4 text-sm font-bold text-muted"
                >
                  Sepetinizde secili urun yok.{' '}
                  <Link to="/cart" className="text-primary underline">
                    Sepete don
                  </Link>
                </p>
              )}

              <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 md:flex-row md:items-center md:justify-between">
                <Link
                  to="/checkout/address"
                  className="flex items-center justify-center gap-1 rounded border border-primary px-6 py-3 text-sm font-bold text-primary"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  Back to Address
                </Link>

                <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-6">
                  <p className="text-sm font-bold text-dark md:text-right">
                    Odenecek tutar:{' '}
                    <span data-testid="order-total" className="text-lg">
                      {formatPrice(grandTotal)}
                    </span>
                  </p>

                  <button
                    type="submit"
                    data-testid="complete-order"
                    disabled={!canPlaceOrder}
                    className="flex items-center justify-center gap-2 rounded bg-primary px-8 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isPlacingOrder && (
                      <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                    )}
                    {isPlacingOrder ? 'Siparis olusturuluyor...' : 'Complete Order'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}

export default CheckoutPaymentPage
