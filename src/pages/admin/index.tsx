import { FiTrash } from "react-icons/fi";
import Header from "../../components/Header";
import Input from "../../components/Input";

import { useState, FormEvent, useEffect } from "react";

import { db } from "../../services/firebaseConnerction";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

interface LinkPros {
  id: string;
  name: string;
  url: string;
  textColor: string;
  backgroundColor: string;
}

function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

  const [links, setLinks] = useState<LinkPros[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");

    const queryRef = query(linksRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
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

    return () => {
      unsub();
    };
  }, []);

  function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      textColor: textColorInput,
      backgroundColor: backgroundColorInput,
      createdAt: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
        <Input
          type="url"
          placeholder="Digite a url"
          value={urlInput}
          onChange={(event) => setUrlInput(event.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Cor do link
            </label>
            <input
              className=" bg-zinc-900 h-9 w-9"
              type="color"
              value={textColorInput}
              onChange={(event) => setTextColorInput(event.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Fundo do Link
            </label>
            <input
              className="bg-zinc-900 h-9 w-9"
              type="color"
              value={backgroundColorInput}
              onChange={(event) => setBackgroundColorInput(event.target.value)}
            />
          </div>
        </section>
        {nameInput !== "" && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">
              Veja como está ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}>
              <p
                className="font-medium"
                style={{
                  color: textColorInput,
                }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 bg-blue-600 h-9 text-white font-medium rounded-md gap-4 flex justify-center items-center">
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>

      {links.map((item) => (
        <article
          key={item.id}
          className="flex items-center justify-between w-11/12 max-w-xl  rounded py-3 px-2 mb-2 select-none"
          style={{
            backgroundColor: item.backgroundColor,
            color: item.textColor,
          }}>
          <p className="font-semibold">{item.name}</p>
          <div>
            <button
              onClick={() => handleDeleteLink(item.id)}
              className="border border-dashed p-1 rounded bg-neutral-900">
              <FiTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Admin;
