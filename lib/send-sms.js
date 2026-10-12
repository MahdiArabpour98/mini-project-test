import axios from "axios";

export const sendSms = async (data) => {
  var smsResponse = {};
  var currentData = data;
  var currentParameters = currentData.parameters || [];
  const newParameters = currentParameters.map((item) => ({
    ...item,
    value: String(item.value).slice(0, 25),
  }));
  const newData = { ...currentData, parameters: newParameters };

  var config = {
    method: "post",
    url: "https://api.sms.ir/v1/send/verify",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
      "x-api-key": process.env.SMS_KEY,
    },
    data: JSON.stringify(newData),
  };

  await axios(config)
    .then(function (response) {
      smsResponse = { status: 201, ok: true, data: response.data };
    })
    .catch(function (error) {
      console.log("SMS_ERROR", error);
      smsResponse = { status: 400, ok: false, data: error?.message };
    });

  return smsResponse;
};
