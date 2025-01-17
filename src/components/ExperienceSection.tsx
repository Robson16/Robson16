import { FaCircle } from 'react-icons/fa'

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="bg-[url('/images/study.jpg')] bg-cover bg-center"
    >
      <div className="bg-black bg-opacity-90">
        <div className="container mx-auto max-w-screen-xl px-4 py-28">
          <div className="flex columns-2 flex-col gap-20 md:flex-row">
            <div className="flex flex-1 flex-col gap-7">
              <h3 className="mb-12 text-center text-3xl font-medium">
                Formação
              </h3>
              <div className="flex flex-1 flex-col gap-2 rounded-sm bg-zinc-800 p-8 shadow-2xl">
                <h4 className="text-xl font-semibold">
                  Art & Multimedia From{' '}
                  <a className="italic text-teal-600" href="#">
                    Oxford University
                  </a>
                </h4>
                <span className="text-teal-600">2005-2008</span>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-2 rounded-sm bg-zinc-800 p-8 shadow-2xl">
                <h4 className="text-xl font-semibold">
                  Art & Multimedia From{' '}
                  <a className="italic text-teal-600" href="#">
                    Oxford University
                  </a>
                </h4>
                <span className="text-teal-600">2005-2008</span>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-2 rounded-sm bg-zinc-800 p-8 shadow-2xl">
                <h4 className="text-xl font-semibold">
                  Art & Multimedia From{' '}
                  <a className="italic text-teal-600" href="#">
                    Oxford University
                  </a>
                </h4>
                <span className="text-teal-600">2005-2008</span>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-7">
              <h3 className="mb-12 text-center text-3xl font-medium">
                Experiência de Trabalho
              </h3>
              <div className="flex flex-1 flex-col gap-2 rounded-sm bg-zinc-800 p-8 shadow-2xl">
                <h4 className="text-xl font-semibold">
                  UI/UX Designer at{' '}
                  <a className="italic text-teal-600" href="#">
                    IronSketch
                  </a>
                </h4>
                <span className="text-teal-600">2005-2008</span>
                <span className="text-sm">Responsibility:</span>
                <ul className="list-inside">
                  <li className="mb-1">
                    <FaCircle className="mr-2 inline-block" size={10} />
                    Validate CSS
                  </li>
                  <li className="mb-1">
                    <FaCircle className="mr-2 inline-block" size={10} />
                    Project Management
                  </li>
                </ul>
              </div>
              <div className="flex flex-1 flex-col gap-2 rounded-sm bg-zinc-800 p-8 shadow-2xl">
                <h4 className="text-xl font-semibold">
                  UI/UX Designer at{' '}
                  <a className="italic text-teal-600" href="#">
                    IronSketch
                  </a>
                </h4>
                <span className="text-teal-600">2005-2008</span>
                <span className="text-sm">Responsibility:</span>
                <ul className="list-inside">
                  <li className="mb-1">
                    <FaCircle className="mr-2 inline-block" size={10} />
                    Validate CSS
                  </li>
                  <li className="mb-1">
                    <FaCircle className="mr-2 inline-block" size={10} />
                    Project Management
                  </li>
                </ul>
              </div>
              <div className="flex flex-1 flex-col gap-2 rounded-sm bg-zinc-800 p-8 shadow-2xl">
                <h4 className="text-xl font-semibold">
                  UI/UX Designer at{' '}
                  <a className="italic text-teal-600" href="#">
                    IronSketch
                  </a>
                </h4>
                <span className="text-teal-600">2005-2008</span>
                <span className="text-sm">Responsibility:</span>
                <ul className="list-inside">
                  <li className="mb-1">
                    <FaCircle className="mr-2 inline-block" size={10} />
                    Validate CSS
                  </li>
                  <li className="mb-1">
                    <FaCircle className="mr-2 inline-block" size={10} />
                    Project Management
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
