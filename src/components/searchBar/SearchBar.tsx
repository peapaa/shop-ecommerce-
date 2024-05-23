import { useContext, useState } from "react";
import styles from "../../App.module.scss";
import { Input } from "antd";
import myContext from "../../context/myContext";
import { Props } from "../../pages/registration/Signup";
import { Link } from "react-router-dom";

const SearchBar = () => {
  // my context
  const context = useContext(myContext) as Props;
  const { getAllProduct } = context;

  // Search State
  const [search, setSearch] = useState<string>("");

  // Filter Search Data
  const filterSearchData = getAllProduct
    .filter((item) => item.totalQuantity > 0)
    .filter((obj) => obj.title.toLowerCase().includes(search))
    .slice(0, 8);

  return (
    <div className={styles.search}>
      {/* search input  */}
      <div className={styles.search__input}>
        <Input
          type="text"
          placeholder="Search here"
          value={search}
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
                      <Link
                        to={`/productinfo/${item.id}`}
                        className={styles.search__dropForm}
                      >
                        <img
                          className={styles.search__dropImage}
                          src={item.productImageUrl}
                          alt=""
                        />
                        <span className={styles.search__dropName}>
                          {item.title}
                        </span>
                      </Link>
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
