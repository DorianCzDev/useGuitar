import { FaRegMinusSquare } from "react-icons/fa";
import FilterHeader from "./FilterHeader";
import { FaRegSquarePlus } from "react-icons/fa6";
import FilterList from "./FilterList";
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import FilterElement from "./FilterElement";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type GuitarFiltersProps = {
  productsBody?: string[];
  productsNeck?: string[];
};

function GuitarFilters({ productsBody, productsNeck }: GuitarFiltersProps) {
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
          queryValue="electric guitar"
          onFilter={handleFilter}
        >
          electric guitars
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="subcategory"
          queryValue="bass guitar"
          onFilter={handleFilter}
        >
          bass guitars
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="subcategory"
          queryValue="acoustic guitar"
          onFilter={handleFilter}
        >
          ACOUSTIC guitars
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="subcategory"
          queryValue="classical guitar"
          onFilter={handleFilter}
        >
          classical guitars
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
        isOpenName={"body"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("body")}
      >
        body
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("body")} listLength="long">
        {Array.isArray(productsBody) &&
          productsBody.map((body) => (
            <FilterElement
              key={body[0]}
              elementType="list"
              selectedIcon={<IoMdCheckbox />}
              unselectedIcon={<MdCheckBoxOutlineBlank />}
              queryName="body"
              queryValue={body[0]}
              onFilter={handleFilter}
            >
              {
                <>
                  {body[0]} <span>{`(${body[1]})`}</span>
                </>
              }
            </FilterElement>
          ))}
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"neck"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("neck")}
      >
        neck
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("neck")} listLength="long">
        {Array.isArray(productsNeck) &&
          productsNeck.map((neck) => (
            <FilterElement
              key={neck[0]}
              elementType="list"
              selectedIcon={<IoMdCheckbox />}
              unselectedIcon={<MdCheckBoxOutlineBlank />}
              queryName="neck"
              queryValue={neck[0]}
              onFilter={handleFilter}
            >
              {
                <>
                  {neck[0]} <span>{`(${neck[1]})`}</span>
                </>
              }
            </FilterElement>
          ))}
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"fretsNumber"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("fretsNumber")}
      >
        frets
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("fretsNumber")} listLength="short">
        <FilterElement
          elementType="input"
          inputIcon={<HiOutlineArrowNarrowRight />}
          queryName="fretsNumber"
          onFilter={handleFilter}
        />
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"stringsNumber"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("stringsNumber")}
      >
        strings number
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("stringsNumber")} listLength="short">
        <FilterElement
          elementType="input"
          inputIcon={<HiOutlineArrowNarrowRight />}
          queryName="stringsNumber"
          onFilter={handleFilter}
        />
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"pickupsActive"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("pickupsActive")}
      >
        pickups active
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("pickupsActive")} listLength="short">
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickupsActive"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickupsActive"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"tremolo"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("tremolo")}
      >
        tremolo
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("tremolo")} listLength="short">
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="tremolo"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="tremolo"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"lefthanded"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("lefthanded")}
      >
        lefthanded
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("lefthanded")} listLength="short">
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="lefthanded"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="lefthanded"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"pickups"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("pickups")}
      >
        pickups
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("pickups")} listLength="long">
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickups"
          queryValue="H"
          onFilter={handleFilter}
        >
          H
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickups"
          queryValue="HH"
          onFilter={handleFilter}
        >
          HH
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickups"
          queryValue="HHH"
          onFilter={handleFilter}
        >
          HHH
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickups"
          queryValue="S"
          onFilter={handleFilter}
        >
          S
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickups"
          queryValue="SS"
          onFilter={handleFilter}
        >
          SS
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickups"
          queryValue="SSS"
          onFilter={handleFilter}
        >
          SSS
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickups"
          queryValue="HS"
          onFilter={handleFilter}
        >
          HS
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="pickups"
          queryValue="HHS"
          onFilter={handleFilter}
        >
          HHS
        </FilterElement>
      </FilterList>
    </>
  );
}

export default GuitarFilters;
