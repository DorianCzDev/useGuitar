import UserUpdate from "@/app/_components/UserUpdate";

export const metadata = {
  title: "Cart",
};

function Page() {
  return (
    <article className="mt-16 w-[900px] mx-auto px-8 md:w-full md:mt-6 md:px-2">
      <UserUpdate />
    </article>
  );
}

export default Page;
