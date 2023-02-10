import moment from 'moment';

const valueDateOfBirth = null;

const mapFormToAPI = (formData) => {
  const APIObjectToSend = {
    assigned_user_id: formData?.assigned_user_id?.id,
    reviewer_user_id: formData?.reviewer_user_id?.id || undefined,
    risk_rating: formData?.risk_rating,
    reason_for_change: formData?.reason_for_change,
    individual: {
      legal_name: formData?.legal_name,
      birth_country_id: formData?.birth_country_id
        ? parseInt(formData?.birth_country_id, 10)
        : undefined,
      dual_nationality_country_ids: formData?.dual_nationality_country_ids?.map(
        (country) => {
          return {
            id: country?.id,
          };
        }
      ),
      title: formData?.title,
      country_id: formData?.country_id,
      known_as_name: formData?.known_as_name,
      date_of_birth: formData?.date_of_birth
        ? moment(formData?.date_of_birth).unix()
        : undefined,
      residence_country_ids: formData?.residence_country_ids?.id && [
        { id: formData?.residence_country_ids?.id },
      ],
      sector_ids: formData?.sector_ids?.id && [
        { id: formData?.sector_ids?.id },
      ],
      legal_type: formData?.legal_type,
    },
  };

  if (formData?.date_of_birth === valueDateOfBirth) {
    delete APIObjectToSend?.individual?.date_of_birth;
  }

  return APIObjectToSend;
};

export default mapFormToAPI;
