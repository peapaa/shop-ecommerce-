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
            src="https://tse3.mm.bing.net/th?id=OIP.xMFp1iD0VXCH-_Xj-QRTqQHaHa&pid=Api&P=0&h=180"
          />
          <p className={styles.testimonial__itemDesc}>
            It's rare to come across a product that combines functionality with
            such elegance, and I am truly grateful to have found it. Thank you
            for creating something that brings both joy and utility into my
            life.
          </p>
          <span
            style={{
              borderBottom: "5px solid rgba(229, 17, 123,0.7)",
              width: "52px",
              display: "inline-block",
              borderRadius: "5px",
            }}
          />

          <h2 className={styles.testimonial__item__text}>Mr.Shara</h2>
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
            I wanted to take a moment to express my sincere gratitude for the
            outstanding product you've provided. From the moment I unwrapped it,
            I could tell that it was crafted with care and precision.
          </p>
          <span
            style={{
              borderBottom: "5px solid rgba(229, 17, 123,0.7)",
              width: "52px",
              display: "inline-block",
              borderRadius: "5px",
            }}
          />
          <h2 className={styles.testimonial__item__text}>Mr.Sung</h2>
          <p className={styles.testimonial__item__textAfter}>UI Develeoper</p>
        </div>

        {/* Testimonial 3 */}
        <div className={styles.testimonial__item}>
          <img
            alt="testimonial"
            className={styles.testimonial__itemImg}
            src="https://cdn.pixabay.com/photo/2017/01/31/22/06/doctor-2027615_1280.png"
          />
          <p className={styles.testimonial__itemDesc}>
            I would like to extend my heartfelt gratitude for providing such a
            high-quality product. I was immediately impressed by the attention
            to detail and the level of craftsmanship evident in every aspect.
          </p>
          <span
            style={{
              borderBottom: "5px solid rgba(229, 17, 123,0.7)",
              width: "52px",
              display: "inline-block",
              borderRadius: "5px",
            }}
          />
          <h2 className={styles.testimonial__item__text}>Mr.Thomas AnDre </h2>
          <p className={styles.testimonial__item__textAfter}>CTO</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
