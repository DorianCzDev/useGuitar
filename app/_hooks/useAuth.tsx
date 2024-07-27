import { useEffect, useState } from "react";

function useAuth({ setLoading }: { setLoading: (value: boolean) => void }) {
  const [data, setData] = useState<{
    status: number;
  } | null>(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return data;
}

export default useAuth;
