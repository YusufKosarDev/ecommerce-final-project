import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import FormField from '../components/FormField'
import { getApiErrorMessage } from '../api/axiosInstance'
import { loginUser } from '../store/actions/clientActions'
import { EMAIL_PATTERN } from '../utils/validators'

const inputClass =
  'w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100'

function LoginPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  // Login sonrasi donulecek route; yoksa Home
  const returnTo = location.state?.from ?? '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (values) => {
    try {
      // Payload yalnizca email + password; rememberMe backend'e gonderilmez
      await dispatch(
        loginUser({
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
        }),
      )

      history.replace(returnTo)
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Giris yapilamadi. Bilgilerinizi kontrol edin.'))
    }
  }

  return (
    <section className="w-full bg-light">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 py-10 md:py-16">
        <div className="flex w-full max-w-md flex-col gap-6 bg-white px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold text-dark md:text-3xl">Login</h1>
            <p className="text-sm text-muted">Hesabina giris yap.</p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-5"
          >
            <FormField id="email" label="Email" error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={inputClass}
                {...register('email', {
                  required: 'Email zorunludur.',
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: 'Gecerli bir email adresi giriniz.',
                  },
                })}
              />
            </FormField>

            <FormField id="password" label="Password" error={errors.password?.message}>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className={inputClass}
                {...register('password', {
                  required: 'Password zorunludur.',
                })}
              />
            </FormField>

            <div className="flex items-center gap-3">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-primary"
                {...register('rememberMe')}
              />
              <label htmlFor="rememberMe" className="text-sm font-bold text-dark">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded bg-primary px-8 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
              )}
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
