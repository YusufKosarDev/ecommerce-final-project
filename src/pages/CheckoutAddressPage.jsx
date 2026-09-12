import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ChevronLeft, LoaderCircle, Pencil, Plus, Trash2, X } from 'lucide-react'
import { toast } from 'react-toastify'
import FormField from '../components/FormField'
import { getApiErrorMessage } from '../api/axiosInstance'
import {
  createAddress,
  deleteAddress,
  fetchAddresses,
  updateAddress,
} from '../store/actions/clientActions'
import { setAddress } from '../store/actions/shoppingCartActions'
import { TURKISH_CITIES } from '../data/cities'
import { isValidTrPhone } from '../utils/validators'

const inputClass =
  'w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100'

const EMPTY_FORM = {
  title: '',
  name: '',
  surname: '',
  phone: '',
  city: '',
  district: '',
  neighborhood: '',
  address: '',
}

function CheckoutAddressPage() {
  const dispatch = useDispatch()
  const addressList = useSelector((state) => state.client.addressList)
  const selectedAddress = useSelector((state) => state.shoppingCart.address)

  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur', defaultValues: EMPTY_FORM })

  useEffect(() => {
    let isActive = true

    dispatch(fetchAddresses())
      .then(() => {
        if (isActive) setLoadError('')
      })
      .catch((error) => {
        if (isActive) setLoadError(getApiErrorMessage(error, 'Adresler yuklenemedi.'))
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [dispatch])

  // Secili adres listeden silindiyse secimi guvenli sekilde temizle
  useEffect(() => {
    if (!selectedAddress?.id) return
    const stillExists = addressList.some((item) => item.id === selectedAddress.id)
    if (!stillExists) dispatch(setAddress({}))
  }, [addressList, selectedAddress, dispatch])

  const openCreateForm = () => {
    setEditingId(null)
    reset(EMPTY_FORM)
    setIsFormOpen(true)
  }

  const openEditForm = (address) => {
    setEditingId(address.id)
    reset({
      title: address.title ?? '',
      name: address.name ?? '',
      surname: address.surname ?? '',
      phone: address.phone ?? '',
      city: address.city ?? '',
      district: address.district ?? '',
      neighborhood: address.neighborhood ?? '',
      address: address.address ?? '',
    })
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingId(null)
    reset(EMPTY_FORM)
  }

  const onSubmit = async (values) => {
    try {
      if (editingId) {
        await dispatch(updateAddress({ id: editingId, ...values }))
        toast.success('Adres guncellendi.')
      } else {
        await dispatch(createAddress(values))
        toast.success('Adres eklendi.')
      }
      closeForm()
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Adres kaydedilemedi.'))
    }
  }

  const handleDelete = async (addressId) => {
    setDeletingId(addressId)
    try {
      await dispatch(deleteAddress(addressId))
      toast.success('Adres silindi.')
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Adres silinemedi.'))
    } finally {
      setDeletingId(null)
    }
  }

  const hasSelection = Boolean(selectedAddress?.id)

  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 py-10 md:py-16">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-primary">Step 1 / 2</p>
          <h1 className="text-2xl font-bold text-dark md:text-3xl">Adres Bilgileri</h1>
        </div>

        {isLoading && (
          <div
            data-testid="address-loading"
            className="flex items-center justify-center gap-2 py-16 text-sm font-bold text-muted"
          >
            <LoaderCircle size={20} className="animate-spin" aria-hidden="true" />
            Adresler yukleniyor...
          </div>
        )}

        {!isLoading && loadError && (
          <p
            role="alert"
            data-testid="address-error"
            className="py-16 text-center text-sm font-bold text-danger"
          >
            {loadError}
          </p>
        )}

        {!isLoading && !loadError && (
          <div className="flex flex-col gap-6">
            {addressList.length === 0 ? (
              <p
                data-testid="address-empty"
                className="border border-dashed border-gray-300 bg-light py-10 text-center text-sm font-bold text-muted"
              >
                Kayitli adresiniz yok. Yeni bir adres ekleyin.
              </p>
            ) : (
              <ul className="flex flex-col gap-4 md:flex-row md:flex-wrap" data-testid="address-list">
                {addressList.map((item) => (
                  <li
                    key={item.id}
                    data-testid="address-card"
                    data-address-id={item.id}
                    className={`flex w-full flex-col gap-3 border p-4 md:w-[calc(50%-0.5rem)] ${
                      selectedAddress?.id === item.id
                        ? 'border-primary bg-light'
                        : 'border-gray-200'
                    }`}
                  >
                    <label className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="selectedAddress"
                        data-testid="address-radio"
                        checked={selectedAddress?.id === item.id}
                        onChange={() => dispatch(setAddress(item))}
                        className="mt-1 h-4 w-4 shrink-0 accent-primary"
                      />
                      <span className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-dark">{item.title}</span>
                        <span className="text-sm text-muted">
                          {item.name} {item.surname} — {item.phone}
                        </span>
                        <span className="text-sm text-muted">
                          {item.neighborhood} / {item.district} / {item.city}
                        </span>
                        {item.address && (
                          <span className="text-sm text-muted">{item.address}</span>
                        )}
                      </span>
                    </label>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        data-testid="address-edit"
                        onClick={() => openEditForm(item)}
                        className="flex items-center gap-1 text-sm font-bold text-primary"
                      >
                        <Pencil size={14} aria-hidden="true" />
                        Duzenle
                      </button>
                      <button
                        type="button"
                        data-testid="address-delete"
                        disabled={deletingId === item.id}
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1 text-sm font-bold text-muted hover:text-danger disabled:opacity-50"
                      >
                        {deletingId === item.id ? (
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
                data-testid="add-address"
                onClick={openCreateForm}
                className="flex items-center justify-center gap-2 self-start rounded border border-primary px-6 py-3 text-sm font-bold text-primary"
              >
                <Plus size={16} aria-hidden="true" />
                Yeni adres ekle
              </button>
            )}

            {isFormOpen && (
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                data-testid="address-form"
                className="flex flex-col gap-5 border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-dark">
                    {editingId ? 'Adresi duzenle' : 'Yeni adres'}
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

                <div className="flex flex-col gap-5 md:flex-row md:gap-4">
                  <FormField id="title" label="Address Title" error={errors.title?.message}>
                    <input
                      id="title"
                      className={inputClass}
                      {...register('title', { required: 'Adres basligi zorunludur.' })}
                    />
                  </FormField>

                  <FormField id="phone" label="Phone" error={errors.phone?.message}>
                    <input
                      id="phone"
                      type="tel"
                      className={inputClass}
                      {...register('phone', {
                        required: 'Telefon zorunludur.',
                        validate: (value) =>
                          isValidTrPhone(value) || 'Gecerli bir telefon numarasi giriniz.',
                      })}
                    />
                  </FormField>
                </div>

                <div className="flex flex-col gap-5 md:flex-row md:gap-4">
                  <FormField id="name" label="Name" error={errors.name?.message}>
                    <input
                      id="name"
                      className={inputClass}
                      {...register('name', { required: 'Ad zorunludur.' })}
                    />
                  </FormField>

                  <FormField id="surname" label="Surname" error={errors.surname?.message}>
                    <input
                      id="surname"
                      className={inputClass}
                      {...register('surname', { required: 'Soyad zorunludur.' })}
                    />
                  </FormField>
                </div>

                <div className="flex flex-col gap-5 md:flex-row md:gap-4">
                  <FormField id="city" label="City" error={errors.city?.message}>
                    <select
                      id="city"
                      className={inputClass}
                      {...register('city', { required: 'Sehir seciniz.' })}
                    >
                      <option value="">Sehir seciniz</option>
                      {TURKISH_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField id="district" label="District" error={errors.district?.message}>
                    <input
                      id="district"
                      className={inputClass}
                      {...register('district', { required: 'Ilce zorunludur.' })}
                    />
                  </FormField>
                </div>

                <FormField
                  id="neighborhood"
                  label="Neighborhood"
                  error={errors.neighborhood?.message}
                >
                  <input
                    id="neighborhood"
                    className={inputClass}
                    {...register('neighborhood', { required: 'Mahalle zorunludur.' })}
                  />
                </FormField>

                <FormField id="address" label="Address" error={errors.address?.message}>
                  <textarea
                    id="address"
                    rows={3}
                    className={inputClass}
                    {...register('address', { required: 'Adres zorunludur.' })}
                  />
                </FormField>

                <button
                  type="submit"
                  data-testid="address-submit"
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

            <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 md:flex-row md:items-center md:justify-between">
              <Link
                to="/cart"
                className="flex items-center justify-center gap-1 rounded border border-primary px-6 py-3 text-sm font-bold text-primary"
              >
                <ChevronLeft size={16} aria-hidden="true" />
                Back to Cart
              </Link>

              {/* Kredi karti adimi T21 kapsaminda; buton simdilik islevsiz. */}
              <button
                type="button"
                data-testid="continue-to-payment"
                disabled={!hasSelection}
                className="rounded bg-primary px-8 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CheckoutAddressPage
