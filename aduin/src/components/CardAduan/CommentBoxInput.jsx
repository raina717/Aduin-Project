import React, { useEffect, useRef } from "react";

import AvatarImg from "../../assets/images/avatar.png";

const CommentBoxInput = ({ profile, onInput, onSend, success }) => {
  const _textBoxRef = useRef();

  useEffect(() => {
    if (_textBoxRef.current && success) {
      _textBoxRef.current.textContent = "";
    }
  }, [success]);

  return (
    <div className="bg-gray-100_01 flex items-center w-full space-x-2 p-6">
      <img
        alt="profile"
        src={profile ?? AvatarImg}
        className="w-12 h-12 object-cover rounded-full"
      />

      <span
        ref={_textBoxRef}
        placeholder="Tuliskan Komentar disini..."
        role="textbox"
        contentEditable
        className="block w-full overflow-hidden resize leading-5 !text-gray-600 border-gray-400 font-poppins p-0 text-md text-left py-2 px-3.5 border rounded focus:border-gray-400 focus:outline-none afs-textarea cursor-text bg-white-A700 whitespace-pre-line"
        onInput={(e) => onInput(JSON.stringify(e.currentTarget.textContent))}
      ></span>

      <div>
        <button className="button-custom" onClick={onSend}>
          Kirim
        </button>
      </div>
    </div>
  );
};

export default CommentBoxInput;
