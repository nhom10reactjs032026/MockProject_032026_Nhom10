import { useState, useEffect } from "react";
import { fetchCustomers } from "../api/crm.api";
import type { Customer } from "../types";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách khách hàng:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return { customers, isLoading };
};
