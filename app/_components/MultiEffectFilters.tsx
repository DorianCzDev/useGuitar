import { FaRegSquarePlus } from "react-icons/fa6";
import FilterHeader from "./FilterHeader";
import { FaRegMinusSquare } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FilterList from "./FilterList";
import FilterElement from "./FilterElement";
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

function MultiEffectFilters() {
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
    <>
      {" "}
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
          queryValue="guitar multi effect"
          onFilter={handleFilter}
        >
          guitar multi effects
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="subcategory"
          queryValue="bass multi effect"
          onFilter={handleFilter}
        >
          bass multi effects
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
        isOpenName={"effects"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("effects")}
      >
        effects
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("effects")} listLength="short">
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="effects"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="effects"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"ampModeling"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("ampModeling")}
      >
        amp modeling
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("ampModeling")} listLength="short">
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="ampModeling"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="ampModeling"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"drumComputer"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("drumComputer")}
      >
        drum computer
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("drumComputer")} listLength="short">
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="drumComputer"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="drumComputer"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"usbPort"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("usbPort")}
      >
        usb port
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("usbPort")} listLength="short">
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="usbPort"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="usbPort"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"auxPort"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("auxPort")}
      >
        aux port
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("auxPort")} listLength="short">
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="auxPort"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="auxPort"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
    </>
  );
}

export default MultiEffectFilters;
