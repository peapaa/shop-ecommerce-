import { useState } from "react";
import styles from "../../App.module.scss";
import { Input } from "antd";

// Search Data
const searchData = [
  {
    name: "Fashion",
    image:
      "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
  },
  {
    name: "Shirt",
    image:
      "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
  },
  {
    name: "Jacket",
    image:
      "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
  },
  {
    name: "Mobile",
    image:
      "https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg",
  },
  {
    name: "Laptop",
    image:
      "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
  },
  {
    name: "Home",
    image:
      "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
  },
  {
    name: "book",
    image:
      "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
  },
];

const SearchBar = () => {
  // Search State
  const [search, setSearch] = useState<string>("");

  // Filter Search Data
  const filterSearchData = searchData
    .filter((obj) => obj.name.toLowerCase().includes(search))
    .slice(0, 8);
  // console.log("filterSearchData", filterSearchData);
  return (
    <div className={styles.search}>
      {/* search input  */}
      <div className={styles.search__input}>
        <Input
          type="text"
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          style={{ height: 26 }}
        />
      </div>

      {/* search drop-down  */}
      <div className={styles.search__drop}>
        {search && (
          <div className={styles.search__dropDown}>
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.map((item, index) => {
                  return (
                    <div key={index} className={styles.search__dropItem}>
                      <div className={styles.search__dropForm}>
                        <img
                          className={styles.search__dropImage}
                          src={item.image}
                          alt=""
                        />
                        <span className={styles.search__dropName}>
                          {item.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className={styles.search__dropIcon}>
                  <img
                    className={styles.search__dropImage}
                    src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                    alt="img"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
