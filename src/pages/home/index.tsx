import { useEffect, useState } from "react";
import Social from "../../components/Social";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

import { db } from "../../services/firebaseConnerction";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

interface LinkPros {
  id: string;
  name: string;
  url: string;
  textColor: string;
  backgroundColor: string;
}

interface SocialProps {
  instagram: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

function Home() {
  const [links, setLinks] = useState<LinkPros[]>([]);
  const [social, setSocial] = useState<SocialProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");

      const queryRef = query(linksRef, orderBy("createdAt", "asc"));

      getDocs(queryRef).then((snapshot) => {
        let lista = [] as LinkPros[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            textColor: doc.data().textColor,
            backgroundColor: doc.data().backgroundColor,
          });
        });

        setLinks(lista);
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
     function loadSocial() {
      const docRef = doc(db, "social", "link");

      getDoc(docRef)
      
       .then((snapshot) => {
        if (snapshot.data() !== undefined) {

          setSocial({
            instagram: snapshot.data()?.instagram,
            linkedin: snapshot.data()?.linkedin,
            github: snapshot.data()?.github,
            portfolio: snapshot.data()?.portfolio,
          });
        }
      });
    }

    loadSocial();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        Wanderson Erli
      </h1>
      <p className="text-gray-500 font-semibold text-xl pb-3">
        Frontend Developer
      </p>

      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇🏽</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            style={{
              backgroundColor: link.backgroundColor,
            }}
            key={link.id}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
            <a href={link.url} target="_blank">
              <p
                className="text-base md:text-lg"
                style={{ color: link.textColor }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {social && Object.keys(social).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={social?.github}>
              <FaGithub size={35} color="#fff" />
            </Social>
            <Social url={social?.linkedin}>
              <FaLinkedin size={35} color="#fff" />
            </Social>
            <Social url={social?.instagram}>
              <FaInstagram size={35} color="#fff" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}

export default Home;
