import mysql from "mysql";
import sendMail from "./booking_mail.js";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tourdb",
});

const bookingadd = async(req, res) => {
  const {
    user_id,
    tour_id,
    amount,
    people,
    booking_date,
    name,
    email,
    phone_no,
  } = req.body;
  const INSERT_Booking_QUERY = `INSERT INTO booking (user_id, tour_id, amount, people, booking_date, name,email,phone_no,booking_status) VALUES (?, ?, ?, ?, ?,?, ?, ?,1)`;
  db.query(
    INSERT_Booking_QUERY,
    [user_id, tour_id, amount, people, booking_date, name, email, phone_no],
    async(error, results) => {
      if (error) {
        res.status(500).send({ message: "Error in booking", error });
      } else {
        try {
          const mailOptions = {
            to: email,
            subject: "Booking Confirmation - Trip-Trekker",
            text: `Dear ${name},\n\nYour booking has been confirmed.\n\nBooking Details:\nTour ID: ${tour_id}\nAmount: ${amount}\nPeople: ${people}\nBooking Date: ${booking_date}\n\nThank you for choosing Trip-Trekker!`,
            html: `
             <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Booking Receipt</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    @media screen {
      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 400;
        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
      }
      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
      }
    }
    body,
    table,
    td,
    a {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    table,
    td {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
    }
    a[x-apple-data-detectors] {
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      text-decoration: none !important;
    }
    div[style*="margin: 16px 0;"] {
      margin: 0 !important;
    }
    body {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    table {
      border-collapse: collapse !important;
    }
    a {
      color: #1a82e2;
    }
    img {
      height: auto;
      line-height: 100%;
      text-decoration: none;
      border: 0;
      outline: none;
    }
  </style>
</head>
<body style="background-color: #f3f3f3;">
    <tr>
      <td align="center" bgcolor="#f3f3f3">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Dear ${name} , Here is a summary of your recent booking. Thank you for choosing Trip-Trekker. If you have any questions or concerns, please <a href="mailto:ankandevelopement.com">contact us</a>.</p>
            </td>
          </tr>
          <!-- end copy -->
          <!-- start booking details table -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" bgcolor="#f3f3f3" width="60%" style="padding: 12px;"><strong>Booking Reference</strong></td>
                  <td align="left" bgcolor="#f3f3f3" width="40%" style="padding: 12px;"><strong>${tour_id}</strong></td>
                </tr>
                <tr>
                  <td align="left" width="60%" style="padding: 12px;">Date</td>
                  <td align="left" width="40%" style="padding: 12px;">${booking_date}</td>
                </tr>
                <tr>
                  <td align="left" width="60%" style="padding: 12px;">Total Updated Amount</td>
                  <td align="left" width="40%" style="padding: 12px;">$${amount}</td>
                </tr>
                <tr>
                  <td align="left" width="60%" style="padding: 12px;">Guests</td>
                  <td align="left" width="40%" style="padding: 12px;">${people}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end booking details table -->
        </table>
      </td>
    </tr>
    <!-- end copy block -->
    <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#f3f3f3" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#f3f3f3" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because you booked with us. If you didn't make this booking, please contact our support team.</p>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#f3f3f3" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">Our Company, 1234 Address St., City, State, 56789</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- end footer -->
  </table>
  <!-- end body -->
</body>
</html>
            `,
          };

          await sendMail(mailOptions);
          console.log("Booking confirmation email sent successfully");
        } catch (err) {
          console.error("Error sending booking confirmation email:", err);
        }
        res.status(200).send({ message: "Booking is successful. Please check your mail for the receipt" });
      }
    }
  );
};
const bookingread = (req, res) => {
  const userId = req.params.id;
  const SELECT_BOOKING_QUERY = `SELECT booking_id,user_id,booking.tour_id,people,amount,booking_date,booking_status,hotel.hotel_id,hotel_name,location,name, email,phone_no FROM booking JOIN tour ON tour.tour_id = booking.tour_id JOIN hotel ON tour.hotel_id = hotel.hotel_id where user_id = ?`;
  db.query(SELECT_BOOKING_QUERY, [userId], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error fetching booking", error });
    } else {
      res.status(200).json({ booking: results });
    }
  });
};
const cancelbooking = (req, res) => {
  const bookingId = req.params.id;
  const UPDATE_BOOKING_STATUS_QUERY = `UPDATE booking SET booking_status = 0 WHERE booking_id = ?`;

  db.query(UPDATE_BOOKING_STATUS_QUERY, [bookingId], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error canceling booking", error });
    } else {
      res.status(200).send({ message: "Booking cancelled successfully" });
    }
  });
};
const specificbookingread = (req, res) => {
  const booking_id = req.params.id;
  const SELECT_SINGLE_BOOKING_QUERY = `SELECT * FROM booking WHERE booking_id = ?`;
  db.query(SELECT_SINGLE_BOOKING_QUERY, [booking_id], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error fetching tour details", error });
    } else {
      if (results.length === 0) {
        res.status(404).send({ message: "Tour not found" });
      } else {
        res.status(200).json({ booking: results[0] });
      }
    }
  });
};
const updatebooking = async(req, res) => {
  const bookingId = req.params.id;
  const { name, email, phone_no, numOfPeople, amount, booking_date } = req.body;
  const UPDATE_BOOKING_QUERY = `
    UPDATE booking
    SET name = ?, email = ?, phone_no = ?, people = ?, amount = ?, booking_date = ? WHERE booking_id = ?
  `;

  db.query(
    UPDATE_BOOKING_QUERY,
    [name, email, phone_no, numOfPeople, amount, booking_date, bookingId],
    async(error, results) => {
      if (error) {
        res.status(500).send({ message: "Error updating booking", error });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).send({ message: "Booking not found" });
        } else {
          try {
            const mailOptions = {
              to: email,
              subject: "Booking Update Confirmation - Trip-Trekker",
              text: `Dear ${name},\n\nYour booking has been updated.\n\nBooking Details:\nBooking_id ID: ${bookingId}\nAmount: ${amount}\nPeople: ${numOfPeople}\nBooking Date: ${booking_date}\n\nThank you for choosing Trip-Trekker!`,
              html: `
               <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Booking Receipt</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    @media screen {
      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 400;
        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
      }
      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
      }
    }
    body,
    table,
    td,
    a {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    table,
    td {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
    }
    a[x-apple-data-detectors] {
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      text-decoration: none !important;
    }
    div[style*="margin: 16px 0;"] {
      margin: 0 !important;
    }
    body {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    table {
      border-collapse: collapse !important;
    }
    a {
      color: #1a82e2;
    }
    img {
      height: auto;
      line-height: 100%;
      text-decoration: none;
      border: 0;
      outline: none;
    }
  </style>
</head>
<body style="background-color: #f3f3f3;">
    <tr>
      <td align="center" bgcolor="#f3f3f3">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Dear ${name}, Here is a summary of your recent booking. Thank you for choosing Trip-Trekker. If you have any questions or concerns, please <a href="mailto:ankandevelopement.com">contact us</a>.</p>
            </td>
          </tr>
          <!-- end copy -->
          <!-- start booking details table -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" bgcolor="#f3f3f3" width="60%" style="padding: 12px;"><strong>Booking Reference</strong></td>
                  <td align="left" bgcolor="#f3f3f3" width="40%" style="padding: 12px;"><strong>${bookingId}</strong></td>
                </tr>
                <tr>
                  <td align="left" width="60%" style="padding: 12px;">Date</td>
                  <td align="left" width="40%" style="padding: 12px;">${booking_date}</td>
                </tr>
                <tr>
                  <td align="left" width="60%" style="padding: 12px;">Total Updated Amount</td>
                  <td align="left" width="40%" style="padding: 12px;">$${amount}</td>
                </tr>
                <tr>
                  <td align="left" width="60%" style="padding: 12px;">Guests</td>
                  <td align="left" width="40%" style="padding: 12px;">${numOfPeople}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end booking details table -->
        </table>
      </td>
    </tr>
    <!-- end copy block -->
    <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#f3f3f3" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#f3f3f3" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because you booked with us. If you didn't make this booking, please contact our support team.</p>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#f3f3f3" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">Our Company, 1234 Address St., City, State, 56789</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- end footer -->
  </table>
  <!-- end body -->
</body>
</html>
              `,
            };
  
            await sendMail(mailOptions);
            console.log("Booking confirmation email sent successfully.");
          } catch (err) {
            console.error("Error sending booking confirmation email:", err);
          }
          res.status(200).send({ message: "Booking updated successfully. Please check your mail for the receipt."});
        }
      }
    }
  );
};
export {
  bookingadd,
  bookingread,
  cancelbooking,
  specificbookingread,
  updatebooking,
};
