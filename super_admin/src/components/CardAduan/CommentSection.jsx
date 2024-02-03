import React from "react";
import Comment from "./Comment";
import CommentBoxInput from "./CommentBoxInput";
import Skeleton from "./Skeleton";
import { checkArray } from "utils";
import { Text } from "components";

import AvatarImg from "../../assets/images/avatar.png";
import moment from "moment";

const CommentSection = ({
  isLoading,
  data,
  type,
  handleInput,
  handleSubmit,
  success,
  profilePhoto,
}) => {
  return (
    <div className="flex flex-col w-full">
      {isLoading ? (
        Array(2)
          .fill("")
          .map((d, index) => <SkeletonComment key={index} />)
      ) : checkArray(data) ? (
        <>
          {data.map((d) => (
            <Comment
              profile={
                !d?.profile_photo
                  ? AvatarImg
                  : d?.profile_photo === ""
                  ? AvatarImg
                  : d?.profile_photo
              }
              name={d.submited_by}
              date={moment(d?.created_at).format("DD MMM YYYY")}
              role={d.role}
              description={d.comment ?? d?.description}
            />
          ))}
        </>
      ) : (
        <div className="w-full h-[100px] flex justify-center items-center">
          <Text>Belum ada {type} saat ini</Text>
        </div>
      )}

      {!isLoading && (
        <CommentBoxInput
          success={success}
          onInput={handleInput}
          onSend={handleSubmit}
          profile={
            !profilePhoto
              ? AvatarImg
              : profilePhoto === ""
              ? AvatarImg
              : profilePhoto
          }
        />
      )}
    </div>
  );
};

const SkeletonComment = () => {
  return (
    <div className="p-6 flex items-start space-x-2 border-b border-b-gray-300">
      <Skeleton circle wrapperClassname="h-12 w-12" className="h-12 w-12" />

      <div className="flex-1 flex flex-col">
        <Skeleton wrapperClassname="w-full mb-2" height="16px" width="150px" />

        <Skeleton wrapperClassname="w-full" height="12px" />
        <Skeleton wrapperClassname="w-full" height="12px" width="30%" />
      </div>
    </div>
  );
};

export default CommentSection;
