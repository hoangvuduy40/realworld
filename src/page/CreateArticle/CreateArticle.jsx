import React from "react";
import useCreateArticle from "./hook/useCreateArticle";

export default function CreateArticle() {
  const {
    register,
    handleSubmit,
    handleSubmitForm,
    tagList,
    handleTag,
    removeTag,
    isLoading,
  } = useCreateArticle();
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    {...register("title")}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    {...register("description")}
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    {...register("body")}
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    onKeyDown={handleTag}
                    {...register("tag")}
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                  />
                  <div className="tag-list">
                    {tagList.map((tag, index) => {
                      return (
                        <span
                          className="tag-default tag-pill ng-binding ng-scope"
                          key={index}
                        >
                          <i
                            className="ion-close-round"
                            onClick={() => removeTag(tag)}
                          ></i>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary d-flex align-items-center"
                  type="submit"
                >
                  {isLoading && (
                    <div className="spinner-border mr-2" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}{" "}
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
