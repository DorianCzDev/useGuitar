import { useEffect, useState } from "react";

function useAuth({ setLoading }: { setLoading: (value: boolean) => void }) {
  const [data, setData] = useState<{
    status: number;
  } | null>(null);
  useEffect(() => {
    fetch("http://localhost:3000/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return data;
}

export default useAuth;
