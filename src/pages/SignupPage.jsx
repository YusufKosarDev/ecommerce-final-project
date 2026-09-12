import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormField from '../components/FormField'
import { CUSTOMER_ROLE_ID, MOCK_ROLES, STORE_ROLE_ID } from '../data/signupData'
import {
  EMAIL_PATTERN,
  PASSWORD_RULES,
  TAX_NO_PATTERN,
  isValidTrIban,
  isValidTrPhone,
} from '../utils/validators'

const inputClass =
  'w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary'

function SignupPage() {
  // API cagrisi T08 ikinci adiminda eklenecek; simdilik sadece validation sonucu gosteriliyor
  const [validatedSummary, setValidatedSummary] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      role_id: String(CUSTOMER_ROLE_ID),
    },
  })

  const selectedRoleId = watch('role_id')
  const isStoreSelected = String(selectedRoleId) === String(STORE_ROLE_ID)

  const onSubmit = (values) => {
    // Hassas alanlar (password / passwordConfirmation) bilerek disarida birakiliyor
    setValidatedSummary({
      name: values.name,
      email: values.email,
      role_id: Number(values.role_id),
      store: values.store
        ? {
            name: values.store.name,
            phone: values.store.phone,
            tax_no: values.store.tax_no,
            bank_account: values.store.bank_account,
          }
        : null,
    })
  }

  return (
    <section className="w-full bg-light">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 py-10 md:py-16">
        <div className="flex w-full max-w-xl flex-col gap-6 bg-white px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold text-dark md:text-3xl">Create account</h1>
            <p className="text-sm text-muted">
              Alisverise baslamak icin hesabini olustur.
            </p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-5"
          >
            <FormField id="name" label="Name" error={errors.name?.message}>
              <input
                id="name"
                type="text"
                autoComplete="name"
                className={inputClass}
                {...register('name', {
                  required: 'Name zorunludur.',
                  minLength: {
                    value: 3,
                    message: 'Name en az 3 karakter olmalidir.',
                  },
                })}
              />
            </FormField>

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

            <FormField
              id="password"
              label="Password"
              error={errors.password?.message}
              hint="En az 8 karakter; 1 buyuk harf, 1 kucuk harf, 1 rakam ve 1 ozel karakter icermelidir."
            >
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className={inputClass}
                {...register('password', {
                  required: 'Password zorunludur.',
                  validate: (value) => {
                    const failed = PASSWORD_RULES.filter((rule) => !rule.test(value))
                    if (failed.length === 0) return true
                    return `Password ${failed.map((rule) => rule.label).join(', ')} icermelidir.`
                  },
                })}
              />
            </FormField>

            <FormField
              id="passwordConfirmation"
              label="Password Confirmation"
              error={errors.passwordConfirmation?.message}
            >
              <input
                id="passwordConfirmation"
                type="password"
                autoComplete="new-password"
                className={inputClass}
                {...register('passwordConfirmation', {
                  required: 'Password tekrari zorunludur.',
                  validate: (value) =>
                    value === getValues('password') || 'Parolalar eslesmiyor.',
                })}
              />
            </FormField>

            <FormField id="role_id" label="Role" error={errors.role_id?.message}>
              <select
                id="role_id"
                className={inputClass}
                {...register('role_id', { required: 'Role secimi zorunludur.' })}
              >
                {MOCK_ROLES.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </FormField>

            {isStoreSelected && (
              <fieldset className="flex w-full flex-col gap-5 border-t border-gray-200 pt-5">
                <legend className="text-sm font-bold text-dark">Store bilgileri</legend>

                <FormField
                  id="store-name"
                  label="Store Name"
                  error={errors.store?.name?.message}
                >
                  <input
                    id="store-name"
                    type="text"
                    className={inputClass}
                    {...register('store.name', {
                      required: 'Store name zorunludur.',
                      minLength: {
                        value: 3,
                        message: 'Store name en az 3 karakter olmalidir.',
                      },
                    })}
                  />
                </FormField>

                <FormField
                  id="store-phone"
                  label="Store Phone"
                  error={errors.store?.phone?.message}
                  hint="Ornek: 0532 123 45 67"
                >
                  <input
                    id="store-phone"
                    type="tel"
                    className={inputClass}
                    {...register('store.phone', {
                      required: 'Store phone zorunludur.',
                      validate: (value) =>
                        isValidTrPhone(value) ||
                        'Gecerli bir Turkiye telefon numarasi giriniz.',
                    })}
                  />
                </FormField>

                <FormField
                  id="store-tax-no"
                  label="Store Tax ID"
                  error={errors.store?.tax_no?.message}
                  hint="Format: T ile baslar ve 10 rakam icerir. Ornek: T1234567890"
                >
                  <input
                    id="store-tax-no"
                    type="text"
                    className={inputClass}
                    {...register('store.tax_no', {
                      required: 'Store tax ID zorunludur.',
                      pattern: {
                        value: TAX_NO_PATTERN,
                        message: 'Tax ID formati TXXXXXXXXXX seklinde olmalidir.',
                      },
                    })}
                  />
                </FormField>

                <FormField
                  id="store-bank-account"
                  label="Store Bank Account"
                  error={errors.store?.bank_account?.message}
                  hint="TR ile baslayan 26 haneli IBAN"
                >
                  <input
                    id="store-bank-account"
                    type="text"
                    className={inputClass}
                    {...register('store.bank_account', {
                      required: 'Store bank account zorunludur.',
                      validate: (value) =>
                        isValidTrIban(value) || 'Gecerli bir TR IBAN giriniz.',
                    })}
                  />
                </FormField>
              </fieldset>
            )}

            <button
              type="submit"
              className="w-full rounded bg-primary px-8 py-3 text-sm font-bold text-white"
            >
              Sign Up
            </button>
          </form>

          {isSubmitSuccessful && validatedSummary && (
            <div
              role="status"
              data-testid="signup-validation-result"
              className="flex flex-col gap-2 border border-[#23856D] bg-light px-4 py-4"
            >
              <p className="text-sm font-bold text-[#23856D]">
                Form validation basarili. API cagrisi bir sonraki adimda eklenecek.
              </p>
              <ul className="flex flex-col gap-1 text-xs text-muted">
                <li>name: {validatedSummary.name}</li>
                <li>email: {validatedSummary.email}</li>
                <li>role_id: {validatedSummary.role_id}</li>
                {validatedSummary.store && (
                  <>
                    <li>store.name: {validatedSummary.store.name}</li>
                    <li>store.phone: {validatedSummary.store.phone}</li>
                    <li>store.tax_no: {validatedSummary.store.tax_no}</li>
                    <li>store.bank_account: {validatedSummary.store.bank_account}</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SignupPage
