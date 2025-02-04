import moment from 'moment';

export const formatDate = (date) => {
  try {
    // Check if date is already a moment object
    const momentDate = moment.isMoment(date) ? date : moment(date);
    
    if (!momentDate.isValid()) {
      throw new Error('Invalid date');
    }
    
    const formattedDate = momentDate.format('Do MMMM YYYY');
    return formattedDate;
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
};


export const convertToISOFormat = (dateString) => {
  // Parse the input date string
  const date = moment(dateString, 'YYYY-MM-DDTHH:mm');

  // Format the date to the desired ISO format
  const isoString = date.toISOString();

  return isoString;
}
