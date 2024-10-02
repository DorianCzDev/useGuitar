import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Sort() {
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
    <div className="flex w-full justify-end items-center md:pb-6 md:justify-center">
      <select
        onChange={(e) => handleFilter("sortBy", e.target.value)}
        className="py-1 px-2 outline-none bg-accent-500 rounded text-fontPrimary-600 border border-primary-600"
      >
        <option value="createdAt">Default</option>
        <option value="name">Name (A-Z)</option>
        <option value="-name">Name (Z-A)</option>
        <option value="price">Price (low-high)</option>
        <option value="-price">Price (high-low)</option>
        <option value="-featured">Featured first</option>
        <option value="-numOfReviews">Popularity</option>
      </select>
    </div>
  );
}

export default Sort;
