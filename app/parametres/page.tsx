"use client";
import MyLabel from "@/components/MyLabel";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { AssuStatus, AssuType, Person } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import QRCode from "qrcode";

const inputStyle =
  "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov";

const ParamPage = () => {
  /*   const session = authClient?.useSession();
  const tempo: any = session?.data?.user;
  const val: any = tempo ? tempo?.role : "USER"; */

  const [parama, setParam] = useState<any>(null);
  const [paramaCurrent, setParamaCurrent] = useState<any>(null);
  const [name, setName] = useState<any>(null);
  const [src, setSrc] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    //console.log("ID", params.clientId);

    const fetchParam = async () => {
      const res = await fetch(`/api/parametres/`, {
        cache: "no-store",
      });

      //console.log("CLIENT: ", res);
      const data = await res.json();
      //console.log("CLIENT: ", data.client);

      setParam(data.param?.origin);
      setParamaCurrent(data.param?.origin);
      setName(data.param?.name);
    };

    fetchParam();
  }, []);

  const processForm = async (e: any) => {
    e.preventDefault();

    const updateOrigin = {
      origin: parama,
    };

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateOrigin),
    };
    console.log("updateOrigin", updateOrigin);

    try {
      //const res = await fetch(process.env.NEXT_PUBLIC_POLES_API!, options);
      //return null;
      const res = await fetch(`/api/parametres/`, options);
      //   const data = await res.json();
      //   return data;
      //router.refresh();
      if (res.ok) {
        setParamaCurrent(parama);
        toast.success("Le paramètre a été mis à jour avec succès.");
      }
      //window.location.reload();
    } catch (e) {
      return e;
    }

    // setData(data);
  };

  const generate = async () => {
    QRCode.toDataURL("https://isoft-nine.vercel.app/rgpd/clients/new").then(
      setSrc
    );
  };

  return (
    <div className="w-full mx-auto ">
      <form onSubmit={processForm}>
        {parama && name && paramaCurrent && (
          <p>
            <span>{name} : </span>{" "}
            <span className="text-yellow-600 mb-2">{paramaCurrent}</span>
            <Input
              value={parama}
              className={inputStyle}
              onChange={(e) => setParam(e.target.value)}
            />
          </p>
        )}
        <Button
          type="submit"
          className="mt-4 bg-green-600 hover:bg-green-400 hover:cursor-pointer"
        >
          Sauvegarder
        </Button>
      </form>
      <div className="mt-16">
        <Button className="bg-green-600 text-white" onClick={generate}>
          Generate QRCode
        </Button>
      </div>
      {src && (
        <div className="mt-8">
          <img src={src} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default ParamPage;
