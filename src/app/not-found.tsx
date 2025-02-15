'use client'

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="bg-black bg-opacity-70">
          <div className="container mx-auto max-w-screen-lg px-4 py-20 md:py-40 xl:py-56">
            <div className="flex flex-col-reverse gap-8 xl:flex-row">
              <h1 className="mt-10 font-semibold">Something went wrong!</h1>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
