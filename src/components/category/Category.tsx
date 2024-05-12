// category
import styles from "../../App.module.scss";
const category = [
  {
    image: "https://cdn-icons-png.flaticon.com/256/4359/4359963.png",
    name: "fashion",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11833/11833323.png",
    name: "shirt",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/8174/8174424.png",
    name: "jacket",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/7648/7648246.png",
    name: "mobile",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12142/12142416.png",
    name: "laptop",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/10686/10686553.png",
    name: "shoes",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12114/12114279.png",
    name: "home",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11946/11946316.png",
    name: "books",
  },
];

const Category = () => {
  return (
    <div className={styles.category}>
      <div className={styles.category__list}>
        {category.map((item, index) => {
          return (
            <div key={index} className={styles.category__item}>
              <img
                className={styles.category__itemImage}
                src={item.image}
                alt="img"
              />

              <h1 className={styles.category__itemName}>{item.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
