import Link from "next/link";

const NotConnected = () => {
  return (
    <div className="text-center py-24">
      <p>{"Vous n'êtes pas connecté(e)"}</p>
      <p className="hover:cursor-pointer">
        <Link className="text-sky-600 hover:text-sky-400" href="/auth/signin">
          Se Connecter
        </Link>
      </p>
    </div>
  );
};

export default NotConnected;
