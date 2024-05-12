/* eslint-disable react/no-unescaped-entities */
import styles from "../../App.module.scss";

const Testimonial = () => {
  return (
    <div className={styles.testimonial}>
      <h1 className={styles.testimonial__text}>Testimonial</h1>

      <h2
        className={styles.testimonial__text}
        style={{ color: "gray", marginTop: "0px" }}
      >
        What our <span style={{ color: "rgb(233 30 99)" }}>customers</span> are
        saying
      </h2>

      <div className={styles.testimonial__container}>
        <div className={styles.testimonial__item}>
          <img
            alt="testimonial"
            className={styles.testimonial__itemImg}
            src="https://ecommerce-sk.vercel.app/img/kamal.png"
          />
          <p className={styles.testimonial__itemDesc}>
            Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki
            taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman
            taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid
            fanny pack vaporware.
          </p>
          <span
            style={{
              borderBottom: "5px solid rgba(229, 17, 123,0.7)",
              width: "52px",
              display: "inline-block",
              borderRadius: "5px",
            }}
          />

          <h2 className={styles.testimonial__item__text}>
            Kamal Nayan Upadhyay
          </h2>
          <p className={styles.testimonial__item__textAfter}>
            Senior Product Designer
          </p>
        </div>

        <div className={styles.testimonial__itemCenter}>
          <img
            alt="testimonial"
            className={styles.testimonial__itemImg}
            src="https://www.devknus.com/img/gawri.png"
          />
          <p className={styles.testimonial__itemDesc}>
            Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki
            taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman
            taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid
            fanny pack vaporware.
          </p>
          <span
            style={{
              borderBottom: "5px solid rgba(229, 17, 123,0.7)",
              width: "52px",
              display: "inline-block",
              borderRadius: "5px",
            }}
          />
          <h2 className={styles.testimonial__item__text}>S Mishra</h2>
          <p className={styles.testimonial__item__textAfter}>UI Develeoper</p>
        </div>

        {/* Testimonial 3 */}
        <div className={styles.testimonial__item}>
          <img
            alt="testimonial"
            className={styles.testimonial__itemImg}
            src="https://firebasestorage.googleapis.com/v0/b/devknus-official-database.appspot.com/o/images%2FScreenshot%202023-07-07%20at%202.20.32%20PM-modified.png?alt=media&token=324ddd80-2b40-422c-9f1c-1c1fa34943fa"
          />
          <p className={styles.testimonial__itemDesc}>
            Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki
            taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman
            taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid
            fanny pack vaporware.
          </p>
          <span
            style={{
              borderBottom: "5px solid rgba(229, 17, 123,0.7)",
              width: "52px",
              display: "inline-block",
              borderRadius: "5px",
            }}
          />
          <h2 className={styles.testimonial__item__text}>XYZ </h2>
          <p className={styles.testimonial__item__textAfter}>CTO</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
