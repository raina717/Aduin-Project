import React, { useLayoutEffect, useRef } from "react";
import Filter from "./Filter";

export let FilterHeight = 0;

const Container = ({
  children,
  searchOnly,
  filterAnggotaDprd,
  wrapperClassname,
  withoutFilter,
  onPressEnter,
}) => {
  const ref = useRef();

  useLayoutEffect(() => {
    FilterHeight = ref.current?.offsetHeight;
  }, []);

  return (
    <div
      className={`flex flex-col h-full w-full p-6 overflow-hidden ${
        wrapperClassname ?? ""
      }`}
    >
      <div ref={ref}>
        {!withoutFilter && (
          <section>
            <Filter
              searchOnly={searchOnly}
              filterAnggotaDprd={filterAnggotaDprd}
              onPressEnter={onPressEnter}
            />
          </section>
        )}
      </div>

      {children}
    </div>
  );
};

export default Container;
