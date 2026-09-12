import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import FormField from '../components/FormField'
import { EMAIL_PATTERN } from '../utils/validators'

const inputClass =
  'w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100'

function LoginPage() {
  const location = useLocation()

  // Login sonrasi donulecek route bilgisi. Yonlendirme T10'un ikinci adiminda yapilacak.
  const returnTo = location.state?.from ?? '/'

  // POST /login ikinci adimda eklenecek; simdilik sadece validation sonucu gosteriliyor
  const [validatedSummary, setValidatedSummary] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = (values) => {
    // password bilerek disarida birakiliyor
    setValidatedSummary({
      email: values.email,
      rememberMe: values.rememberMe,
      returnTo,
    })
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
              className="w-full rounded bg-primary px-8 py-3 text-sm font-bold text-white"
            >
              Login
            </button>
          </form>

          {isSubmitSuccessful && validatedSummary && (
            <div
              role="status"
              data-testid="login-validation-result"
              className="flex flex-col gap-2 border border-[#23856D] bg-light px-4 py-4"
            >
              <p className="text-sm font-bold text-[#23856D]">
                Form validation basarili. API cagrisi bir sonraki adimda eklenecek.
              </p>
              <ul className="flex flex-col gap-1 text-xs text-muted">
                <li>email: {validatedSummary.email}</li>
                <li>rememberMe: {String(validatedSummary.rememberMe)}</li>
                <li>returnTo: {validatedSummary.returnTo}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LoginPage
