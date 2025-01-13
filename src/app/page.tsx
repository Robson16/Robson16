import Header from '@/components/Header'
import SocialLink from '@/components/SocialLink'
import Head from 'next/head'
import Image from 'next/image'
import {
  AiFillGithub,
  AiFillGitlab,
  AiFillLinkedin,
  AiOutlineMail,
} from 'react-icons/ai'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preload" href="/images/profile.jpg" as="image" />
      </Head>

      <Header />
      <main>
        <section
          id="home"
          className="bg-[url('/images/bg-above-the-fold.jpg')] bg-cover bg-center"
        >
          <div className="bg-black bg-opacity-70">
            <div className="container mx-auto max-w-screen-lg px-4 py-28 md:py-56">
              <div className="flex columns-2 flex-col md:flex-row">
                <div className="flex flex-1 flex-col items-center justify-center md:items-start">
                  <h1 className="mb-4 text-center text-5xl font-bold md:text-left">
                    Robson H. Rodrigues
                  </h1>
                  <h2 className="text-2xl font-medium">Desenvolvedor Web</h2>
                  <ul className="my-10">
                    <li className="group my-2 flex items-center">
                      <AiOutlineMail
                        size={16}
                        className="mr-2 text-gray-500 group-hover:text-teal-600"
                      />
                      <a href="mailto:robhenrod@gmail.com">
                        robhenrod@gmail.com
                      </a>
                    </li>
                    <li className="group my-2 flex items-center">
                      <FaMapMarkerAlt
                        size={16}
                        className="mr-2 text-gray-500 group-hover:text-teal-600"
                      />
                      <span>Jundiaí - São Paulo / Brasil</span>
                    </li>
                  </ul>
                  <ul className="flex">
                    <li className="my-4 mr-4">
                      <SocialLink
                        href="https://github.com/Robson16"
                        Icon={AiFillGithub}
                      />
                    </li>
                    <li className="my-4 mr-4">
                      <SocialLink
                        href="https://gitlab.com/Robson16"
                        Icon={AiFillGitlab}
                      />
                    </li>
                    <li className="my-4 mr-4">
                      <SocialLink
                        href="https://www.linkedin.com/in/robson-h-rodrigues-93341746/"
                        Icon={AiFillLinkedin}
                      />
                    </li>
                  </ul>
                </div>
                <div className="flex flex-1 flex-col items-center md:items-end">
                  <figure className="rounded-full border-[20px] border-zinc-950">
                    <Image
                      src="/images/profile.jpg"
                      priority={true}
                      alt="Picture of the author"
                      width={360}
                      height={360}
                      className="mx-auto rounded-full border-[20px] border-zinc-900"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about">
          <div className="container mx-auto max-w-screen-xl px-4 py-28">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              voluptate pariatur minus corporis harum ducimus placeat
              architecto. Repudiandae hic error odio natus veniam consectetur
              cupiditate aperiam, odit et, omnis ratione.
            </p>
            <p>
              Temporibus perspiciatis quia, doloribus minima possimus cumque
              voluptas perferendis tempora maiores officia expedita quis enim
              obcaecati? Laborum nobis, molestiae natus enim aut ducimus ad
              nesciunt accusantium labore minus sint inventore?
            </p>
            <p>
              At adipisci, voluptates incidunt placeat veniam id laudantium
              magnam, consequuntur quis deleniti rerum reprehenderit aperiam sed
              excepturi nulla nostrum natus repellendus optio, deserunt nam
              maiores illum provident iusto quo. Illo.
            </p>
            <p>
              Illo omnis ea ab, magnam debitis corrupti cumque incidunt nesciunt
              maiores ex at sit eius blanditiis laudantium eum molestias, alias
              expedita velit soluta, tempore laborum! Qui quia alias similique
              mollitia.
            </p>
            <p>
              Similique delectus odio veniam sint suscipit praesentium culpa
              dolorem omnis. Et, sunt. Dicta commodi error ipsum. Animi id
              eligendi laudantium suscipit consequatur nostrum molestias quam
              similique cum, sed nisi dolorum?
            </p>
            <p>
              Odit accusantium ad nisi aspernatur ipsam reiciendis consectetur
              eos deleniti, ab magnam! Cupiditate, illo tempore rerum vero animi
              autem fugiat recusandae blanditiis beatae assumenda explicabo
              provident quas rem magni aperiam.
            </p>
            <p>
              Ab neque sequi reprehenderit harum iste ipsa quisquam repellat qui
              corrupti, a aperiam nihil nemo est deserunt cumque sint atque
              perferendis? Aut accusantium illum velit ea ex quasi, beatae
              officiis!
            </p>
            <p>
              Repellat nemo, dolorum suscipit ratione officia hic rem ipsum
              veritatis dolor harum fugit temporibus blanditiis porro natus
              voluptas numquam provident, fugiat, unde a. Aliquid aut reiciendis
              provident eligendi blanditiis vel!
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non nemo
              consectetur dignissimos laboriosam porro accusamus in! Commodi
              tenetur quae numquam minus id dolor quaerat deleniti cupiditate,
              ex qui saepe eaque!
            </p>
            <p>
              Magnam debitis, officia unde commodi cupiditate adipisci quidem
              fugiat repellendus quod impedit, laudantium repellat illo aliquam
              alias. Quos, vel minus odit at quo libero voluptas officiis in,
              molestiae, veniam esse!
            </p>
            <p>
              Assumenda debitis eum ut, magni incidunt inventore eligendi totam,
              sed quia libero natus illo deleniti recusandae, ad explicabo ullam
              praesentium aliquam eos! Repellendus omnis eum deleniti ratione
              qui. Repellat, modi.
            </p>
            <p>
              Officia asperiores voluptatibus assumenda amet repudiandae maiores
              veniam harum beatae eligendi aliquam obcaecati velit maxime
              distinctio nostrum deleniti ipsa vitae, eaque nobis omnis quidem
              tempora modi facere? Maiores, vero ipsam?
            </p>
            <p>
              Pariatur aliquam, sapiente maxime magnam eveniet assumenda debitis
              cupiditate reiciendis consequatur rerum alias consequuntur!
              Tenetur unde porro iure, maxime distinctio quibusdam id optio!
              Reiciendis sunt corporis incidunt, blanditiis praesentium
              molestiae!
            </p>
          </div>
        </section>
        <section id="skills">
          <div className="container mx-auto max-w-screen-xl px-4 py-28">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              voluptate pariatur minus corporis harum ducimus placeat
              architecto. Repudiandae hic error odio natus veniam consectetur
              cupiditate aperiam, odit et, omnis ratione.
            </p>
            <p>
              Temporibus perspiciatis quia, doloribus minima possimus cumque
              voluptas perferendis tempora maiores officia expedita quis enim
              obcaecati? Laborum nobis, molestiae natus enim aut ducimus ad
              nesciunt accusantium labore minus sint inventore?
            </p>
            <p>
              At adipisci, voluptates incidunt placeat veniam id laudantium
              magnam, consequuntur quis deleniti rerum reprehenderit aperiam sed
              excepturi nulla nostrum natus repellendus optio, deserunt nam
              maiores illum provident iusto quo. Illo.
            </p>
            <p>
              Illo omnis ea ab, magnam debitis corrupti cumque incidunt nesciunt
              maiores ex at sit eius blanditiis laudantium eum molestias, alias
              expedita velit soluta, tempore laborum! Qui quia alias similique
              mollitia.
            </p>
            <p>
              Similique delectus odio veniam sint suscipit praesentium culpa
              dolorem omnis. Et, sunt. Dicta commodi error ipsum. Animi id
              eligendi laudantium suscipit consequatur nostrum molestias quam
              similique cum, sed nisi dolorum?
            </p>
            <p>
              Odit accusantium ad nisi aspernatur ipsam reiciendis consectetur
              eos deleniti, ab magnam! Cupiditate, illo tempore rerum vero animi
              autem fugiat recusandae blanditiis beatae assumenda explicabo
              provident quas rem magni aperiam.
            </p>
            <p>
              Ab neque sequi reprehenderit harum iste ipsa quisquam repellat qui
              corrupti, a aperiam nihil nemo est deserunt cumque sint atque
              perferendis? Aut accusantium illum velit ea ex quasi, beatae
              officiis!
            </p>
            <p>
              Repellat nemo, dolorum suscipit ratione officia hic rem ipsum
              veritatis dolor harum fugit temporibus blanditiis porro natus
              voluptas numquam provident, fugiat, unde a. Aliquid aut reiciendis
              provident eligendi blanditiis vel!
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non nemo
              consectetur dignissimos laboriosam porro accusamus in! Commodi
              tenetur quae numquam minus id dolor quaerat deleniti cupiditate,
              ex qui saepe eaque!
            </p>
            <p>
              Magnam debitis, officia unde commodi cupiditate adipisci quidem
              fugiat repellendus quod impedit, laudantium repellat illo aliquam
              alias. Quos, vel minus odit at quo libero voluptas officiis in,
              molestiae, veniam esse!
            </p>
            <p>
              Assumenda debitis eum ut, magni incidunt inventore eligendi totam,
              sed quia libero natus illo deleniti recusandae, ad explicabo ullam
              praesentium aliquam eos! Repellendus omnis eum deleniti ratione
              qui. Repellat, modi.
            </p>
            <p>
              Officia asperiores voluptatibus assumenda amet repudiandae maiores
              veniam harum beatae eligendi aliquam obcaecati velit maxime
              distinctio nostrum deleniti ipsa vitae, eaque nobis omnis quidem
              tempora modi facere? Maiores, vero ipsam?
            </p>
            <p>
              Pariatur aliquam, sapiente maxime magnam eveniet assumenda debitis
              cupiditate reiciendis consequatur rerum alias consequuntur!
              Tenetur unde porro iure, maxime distinctio quibusdam id optio!
              Reiciendis sunt corporis incidunt, blanditiis praesentium
              molestiae!
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
