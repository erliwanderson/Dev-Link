import { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";

import { db } from "../../services/firebaseConnerction";
import { setDoc, doc, getDoc } from "firebase/firestore";

function Networks() {
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link");

      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setInstagram(snapshot.data()?.instagram);
          setLinkedin(snapshot.data()?.linkedin);
          setGithub(snapshot.data()?.github);
          setPortfolio(snapshot.data()?.portfolio);
        }
      });
    }
    loadLinks();
  }, []);

  
  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      instagram,
      linkedin,
      github,
      portfolio,
    })
      .then(() => {
        console.log("Links cadastrados com sucesso");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-2xl font-medium text-white mt-8 mb-4">
        Minhas redes sociais
      </h1>

      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-3">
          Link do meu Instagram
        </label>
        <Input
          type="url"
          placeholder="Digite a url "
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-3">
          Link do meu linkedin
        </label>
        <Input
          type="url"
          placeholder="Digite a url "
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-3">
          Link do meu GitHub
        </label>
        <Input
          type="url"
          placeholder="Digite a url "
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-3">
          Link do meu Portfolio
        </label>
        <Input
          type="url"
          placeholder="Digite a url"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white h-9 rounded-md mb-7 flex items-center justify-center font-medium">
          Salvar Links
        </button>
      </form>
    </div>
  );
}

export default Networks;
