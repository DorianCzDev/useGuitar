import Link from "next/link";

type OrderCustomerDetailsProps = {
  user: {
    firstName: string;
    lastName: string;
    address: string;
    postCode: string;
    city: string;
    phoneNumber: string;
    country: string;
  };
};

function OrderCustomerDetails({ user }: OrderCustomerDetailsProps) {
  return (
    <div className=" bg-accent-500 rounded-xl w-max relative py-5 px-7 group">
      <p className="text-lg py-2 tracking-wide">{`${user.firstName} ${user.lastName}`}</p>
      <p className="text-lg py-2 tracking-wide">{`${user.address} ${user.postCode} ${user.city} `}</p>
      <p className="text-lg py-2 tracking-wide">{`${user.phoneNumber} ${user.country} `}</p>
      <Link
        href={`/cart/update-user`}
        className="absolute top-5 right-4 text-secondary-500 cursor-pointer text-lg opacity-0 transition-all group-hover:opacity-100"
      >
        edit
      </Link>
    </div>
  );
}

export default OrderCustomerDetails;
