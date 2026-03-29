import { useState, useEffect } from "react";
import { fetchCustomerProfile, fetchCustomerContacts } from "../api/crm.api";
import type { CustomerProfileDetail, Contact } from "../types";

export const useCustomerDetail = (
  id: string | undefined,
  activeTab: string,
) => {
  const [profileData, setProfileData] = useState<CustomerProfileDetail>();
  const [contactsData, setContactsData] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "Profile" && !profileData) {
          const data = await fetchCustomerProfile(id);
          setProfileData(data);
        } else if (activeTab === "Contacts" && contactsData.length === 0) {
          const data = await fetchCustomerContacts(id);
          setContactsData(data);
        }
      } catch (error) {
        console.error("Lỗi tải chi tiết khách hàng:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, activeTab]);

  return { profileData, contactsData, isLoading };
};
