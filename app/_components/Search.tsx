"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(name: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (params.get(name) === value || !value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="mt-6 flex justify-center border-b border-primary-600">
      <input
        placeholder="Search for products..."
        onChange={(e) => handleFilter("name", e.target.value)}
        className="text-fontPrimary-600 border border-primary-600 w-3/4 outline-none mb-10 focus:border-primary-500 py-3 px-4 bg-accent-500 md:w-full"
      />
    </div>
  );
}

export default Search;
