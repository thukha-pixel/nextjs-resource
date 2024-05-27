import Image from 'next/image';

export default function Header() {
  return (
    <>
      <Image src="/logo.php" alt="A server surrounding" width={100} height={100}/>
      <h1>Welcome to this NextJS Course!</h1>
    </>
  );
}