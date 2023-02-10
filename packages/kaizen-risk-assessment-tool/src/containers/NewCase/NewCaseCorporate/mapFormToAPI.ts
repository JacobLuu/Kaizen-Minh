import { convertTimeToStartOfDay } from '../../../utils/momentHelpers';

const mapFormToAPI = (formData) => {
  const APIObjectToSend = {
    assigned_user_id: formData?.assigned_user_id?.id,
    reviewer_user_id: formData?.reviewer_user_id?.id || undefined,
    risk_rating: formData?.risk_rating || undefined,
    reason_for_change: formData?.reason_for_change,
    corporate: {
      is_company_incorporated: formData?.is_company_incorporated,
      company_name: formData?.company_name,
      client_type_id: formData?.client_type_id,
      incorporation_country_ids: formData?.incorporation_country_ids?.id && [
        { id: formData?.incorporation_country_ids?.id },
      ],
      incorporation_date: formData?.incorporation_date
        ? convertTimeToStartOfDay(formData?.incorporation_date)
        : undefined,
      internal_id: formData?.internal_id,
      legal_type: formData?.legal_type,
      company_number: formData?.company_number,
      corporate_status: formData?.corporate_status,
      operation_country_ids: formData?.operation_country_ids?.map((country) => {
        return {
          id: country?.id,
        };
      }),
      bvd_number: formData?.bvd_number,
      regulatory_id: formData?.regulatory_id,
      is_listed: formData?.is_listed,
    },
  };

  return APIObjectToSend;
};

export default mapFormToAPI;
