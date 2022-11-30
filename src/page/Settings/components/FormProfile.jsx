import useFormProfile from "../hook/useFormProfile";

const FormProfile = () => {
  const { register, handleSubmit, handleUpdateProfile, errors, isLoading } =
    useFormProfile();
  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)}>
      <fieldset>
        <fieldset className="form-group">
          <input
            {...register("image", {
              pattern: {
                value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g,
                message: "Error address images",
              },
            })}
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
          />
          {errors.image && (
            <span className="text-danger">{errors.image.message}</span>
          )}
        </fieldset>
        <fieldset className="form-group">
          <input
            {...register("username", {
              required: {
                value: true,
                message: " This field is required",
              },
            })}
            className="form-control form-control-lg"
            type="text"
            placeholder="Your Name"
          />
          {errors.username && (
            <span className="text-danger">{errors.username.message}</span>
          )}
        </fieldset>
        <fieldset className="form-group">
          <textarea
            {...register("bio")}
            className="form-control form-control-lg"
            rows="8"
            placeholder="Short bio about you"
          ></textarea>
        </fieldset>
        <fieldset className="form-group">
          <input
            {...register("email", {
              required: {
                value: true,
                message: " This field is required",
              },
              pattern: {
                value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Error address email",
              },
            })}
            className="form-control form-control-lg"
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </fieldset>
        <fieldset className="form-group">
          <input
            {...register("password", {
              minLength: {
                value: 6,
                message: "Min length minimum 6",
              },
            })}
            className="form-control form-control-lg"
            type="password"
            placeholder="Password"
          />
        </fieldset>
        <button
          type="submit"
          className="btn btn-lg btn-primary pull-xs-right d-flex align-items-center"
        >
          {" "}
          {isLoading && (
            <div className="spinner-border mr-2" role="status">
              <span className="visually-hidden"></span>
            </div>
          )}
          Update Settings
        </button>
      </fieldset>
    </form>
  );
};

export default FormProfile;
