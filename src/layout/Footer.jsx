function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 py-8 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-900">Bandage</h2>
          <p className="text-sm text-gray-500">Footer placeholder</p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-900">Company</h3>
          <p className="text-sm text-gray-500">Link placeholder</p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-900">Support</h3>
          <p className="text-sm text-gray-500">Link placeholder</p>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto flex w-full max-w-screen-xl px-4 py-4">
          <p className="text-sm text-gray-500">
            Made with love by Workintech student
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
