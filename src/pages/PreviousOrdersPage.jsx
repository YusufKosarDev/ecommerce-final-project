import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDown, ChevronUp, LoaderCircle, Package } from 'lucide-react'
import { getApiErrorMessage } from '../api/axiosInstance'
import { fetchAddresses } from '../store/actions/clientActions'
import { fetchOrders } from '../store/actions/shoppingCartActions'
import { formatOrderDate, getOrderItemCount } from '../utils/order'
import { formatPrice, getProductImage } from '../utils/products'
import { maskCardNumber } from '../utils/cards'

// Yeni siparis ustte olsun; tarih cozulemezse id'ye duser.
function sortOrders(orders) {
  return [...orders].sort((a, b) => {
    const dateA = new Date(String(a?.order_date ?? '').replace(' ', 'T')).getTime()
    const dateB = new Date(String(b?.order_date ?? '').replace(' ', 'T')).getTime()
    if (Number.isFinite(dateA) && Number.isFinite(dateB) && dateA !== dateB) return dateB - dateA
    return Number(b?.id ?? 0) - Number(a?.id ?? 0)
  })
}

function PreviousOrdersPage() {
  const dispatch = useDispatch()
  const addressList = useSelector((state) => state.client.addressList)

  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  // Birden fazla siparis ayni anda acik kalabilir.
  const [openOrderIds, setOpenOrderIds] = useState([])

  useEffect(() => {
    let isActive = true

    dispatch(fetchOrders())
      .then((data) => {
        if (!isActive) return
        setOrders(sortOrders(data))
        setLoadError('')
      })
      .catch((error) => {
        if (isActive) setLoadError(getApiErrorMessage(error, 'Siparisler yuklenemedi.'))
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [dispatch])

  // GET /order yalnizca address_id donuyor; adres basligi icin kayitli
  // adresler kullanilir. Bu istek basarisiz olursa sayfa yine calisir.
  useEffect(() => {
    if (addressList.length > 0) return
    dispatch(fetchAddresses()).catch(() => {})
  }, [dispatch, addressList.length])

  const toggleOrder = (orderId) => {
    setOpenOrderIds((open) =>
      open.includes(orderId) ? open.filter((id) => id !== orderId) : [...open, orderId],
    )
  }

  const findAddress = (addressId) =>
    addressList.find((address) => String(address?.id) === String(addressId))

  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 py-10 md:py-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-dark md:text-3xl">Siparislerim</h1>
          <p className="text-sm text-muted">Gecmis siparislerinizi buradan takip edebilirsiniz.</p>
        </div>

        {isLoading && (
          <div
            data-testid="orders-loading"
            className="flex items-center justify-center gap-2 py-16 text-sm font-bold text-muted"
          >
            <LoaderCircle size={20} className="animate-spin" aria-hidden="true" />
            Siparisler yukleniyor...
          </div>
        )}

        {!isLoading && loadError && (
          <p
            role="alert"
            data-testid="orders-error"
            className="py-16 text-center text-sm font-bold text-danger"
          >
            {loadError}
          </p>
        )}

        {!isLoading && !loadError && orders.length === 0 && (
          <div
            data-testid="orders-empty"
            className="flex flex-col items-center gap-3 border border-dashed border-gray-300 bg-light py-16 text-center"
          >
            <Package size={32} className="text-muted" aria-hidden="true" />
            <p className="text-sm font-bold text-muted">Henuz siparisiniz bulunmuyor.</p>
          </div>
        )}

        {!isLoading && !loadError && orders.length > 0 && (
          <ul className="flex flex-col gap-4" data-testid="order-list">
            {orders.map((order) => {
              const isOpen = openOrderIds.includes(order.id)
              const address = findAddress(order.address_id)
              const products = Array.isArray(order.products) ? order.products : []

              return (
                <li
                  key={order.id}
                  data-testid="order-card"
                  data-order-id={order.id}
                  className="flex flex-col gap-4 border border-gray-200 p-4 md:p-6"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-bold text-dark">Siparis #{order.id}</p>
                      <p className="text-sm text-muted" data-testid="order-date">
                        {formatOrderDate(order.order_date)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 md:items-end">
                      <p className="text-lg font-bold text-dark" data-testid="order-price">
                        {formatPrice(order.price) || '-'}
                      </p>
                      <p className="text-sm text-muted" data-testid="order-item-count">
                        {getOrderItemCount(order)} urun
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 border-t border-gray-100 pt-3 text-sm text-muted md:flex-row md:justify-between md:gap-6">
                    {address ? (
                      <p data-testid="order-address">
                        Teslimat: {address.title} — {address.district} / {address.city}
                      </p>
                    ) : (
                      <p data-testid="order-address">
                        {order.address_id
                          ? `Teslimat adresi: #${order.address_id}`
                          : 'Teslimat adresi bilgisi yok.'}
                      </p>
                    )}

                    {/* Kart numarasi API'de acik gelse de UI'da maskeli gosterilir. */}
                    {order.card_no ? (
                      <p data-testid="order-card-info">
                        Odeme: {maskCardNumber(order.card_no)}
                        {order.card_name ? ` — ${order.card_name}` : ''}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    data-testid="order-details-toggle"
                    aria-expanded={isOpen}
                    onClick={() => toggleOrder(order.id)}
                    className="flex items-center gap-1 self-start text-sm font-bold text-primary"
                  >
                    {isOpen ? 'Detaylari gizle' : 'Detaylar'}
                    {isOpen ? (
                      <ChevronUp size={16} aria-hidden="true" />
                    ) : (
                      <ChevronDown size={16} aria-hidden="true" />
                    )}
                  </button>

                  {isOpen && (
                    <ul
                      data-testid="order-details"
                      className="flex flex-col gap-4 border-t border-gray-100 pt-4"
                    >
                      {products.length === 0 ? (
                        <li className="text-sm text-muted">Bu siparis icin urun bilgisi yok.</li>
                      ) : (
                        products.map((product, index) => {
                          const image = getProductImage(product)
                          const count = Number(product?.count) || 0
                          const unitPrice = Number(product?.price)
                          const hasPrice = Number.isFinite(unitPrice)

                          return (
                            <li
                              key={`${order.id}-${product?.id ?? index}`}
                              data-testid="order-product"
                              className="flex items-start gap-4"
                            >
                              {image ? (
                                <img
                                  src={image}
                                  alt={product?.name ?? 'Urun'}
                                  loading="lazy"
                                  className="h-20 w-16 shrink-0 object-cover"
                                />
                              ) : (
                                <span className="flex h-20 w-16 shrink-0 items-center justify-center bg-light">
                                  <Package size={20} className="text-muted" aria-hidden="true" />
                                </span>
                              )}

                              <div className="flex flex-1 flex-col gap-1">
                                <p className="text-sm font-bold text-dark">
                                  {product?.name ?? 'Urun'}
                                </p>
                                <p className="text-xs text-muted">Urun ID: {product?.id ?? '-'}</p>
                                <p className="text-sm text-muted">
                                  {count} adet{hasPrice ? ` x ${formatPrice(unitPrice)}` : ''}
                                </p>
                              </div>

                              {hasPrice && (
                                <p className="text-sm font-bold text-dark">
                                  {formatPrice(unitPrice * count)}
                                </p>
                              )}
                            </li>
                          )
                        })
                      )}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

export default PreviousOrdersPage
