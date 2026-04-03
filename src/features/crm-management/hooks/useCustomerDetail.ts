import { useState, useEffect } from "react";
import { fetchCustomerProfile, fetchCustomerContacts } from "../api/crm.api";
import type { CustomerProfileDetail, Contact } from "../types";

/**
 * Custom hook to fetch customer details dynamically based on the active tab.
 * Implements simple caching to avoid refetching data if it already exists.
 * * @param id - The customer ID from URL params.
 * @param activeTab - The currently selected tab string.
 */
export const useCustomerDetail = (
  id: string | undefined,
  activeTab: string,
) => {
  const [profileData, setProfileData] = useState<CustomerProfileDetail>();
  const [contactsData, setContactsData] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Exit early if no ID is provided

    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch conditionally based on the active tab to save bandwidth
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
    // We want to trigger this effect whenever the tab changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, activeTab]);

  return { profileData, contactsData, isLoading };
};
