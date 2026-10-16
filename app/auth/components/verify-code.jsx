export default function VerifyCode({ userData, handleChangeStep }) {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          handleChangeStep(1);
        }}
        className="back-button"
      >
        بازگشت و ویرایش اطلاعات
      </button>
    </>
  );
}
