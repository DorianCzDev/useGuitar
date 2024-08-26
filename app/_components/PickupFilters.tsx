import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FilterHeader from "./FilterHeader";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegMinusSquare } from "react-icons/fa";
import FilterList from "./FilterList";
import FilterElement from "./FilterElement";
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

function PickupFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  let params = [];

  for (let entry of searchParams.entries()) {
    if (entry[0].includes("-")) {
      params.push(entry[0].split("-")[1]);
    } else {
      params.push(entry[0]);
    }
  }

  const [isOpen, setIsOpen] = useState<string[]>(params || []);

  function handleFilter(name: string, value?: string) {
    const params = new URLSearchParams(searchParams);
    if (params.get(name) === value || !value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"subcategory"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("subcategory")}
      >
        category
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("subcategory")} listLength="short">
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="subcategory"
          queryValue="electric guitar pickup"
          onFilter={handleFilter}
        >
          electric guitars
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="subcategory"
          queryValue="bass guitar pickup"
          onFilter={handleFilter}
        >
          bass guitars pickups
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"price"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("price")}
      >
        price
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("price")} listLength="short">
        <FilterElement
          elementType="input"
          inputIcon={<HiOutlineArrowNarrowRight />}
          queryName="price"
          onFilter={handleFilter}
        />
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"pickup"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("pickup")}
      >
        pickup type
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("pickup")} listLength="short">
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickup"
          queryValue="humbacker"
          onFilter={handleFilter}
        >
          humbacker
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickup"
          queryValue="single coil"
          onFilter={handleFilter}
        >
          single coil
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"output"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("output")}
      >
        output
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("output")} listLength="short">
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="output"
          queryValue="high"
          onFilter={handleFilter}
        >
          high
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="output"
          queryValue="medium"
          onFilter={handleFilter}
        >
          medium
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="output"
          queryValue="low"
          onFilter={handleFilter}
        >
          low
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"piskupStringsNumber"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("piskupStringsNumber")}
      >
        pickup strings number
      </FilterHeader>
      <FilterList
        isOpen={isOpen.includes("piskupStringsNumber")}
        listLength="short"
      >
        <FilterElement
          elementType="input"
          inputIcon={<HiOutlineArrowNarrowRight />}
          queryName="piskupStringsNumber"
          onFilter={handleFilter}
        />
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"active"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("active")}
      >
        active
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("active")} listLength="short">
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="active"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="active"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"kappe"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("kappe")}
      >
        kappe
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("kappe")} listLength="short">
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="kappe"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="kappe"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
    </>
  );
}

export default PickupFilters;
