import React, { useState } from "react";
import { Photographer } from "@/store/photographers";
import styles from "./profile.module.css";

interface ProfileProps {
  photographer: Photographer;
}

const getPlaceholderImage = (id: number) => {
  const placeholders = [
    "/images/placeholder1.svg",
    "/images/placeholder2.svg",
    "/images/placeholder3.svg",
  ];
  return placeholders[(id - 1) % placeholders.length];
};

const Profile: React.FC<ProfileProps> = ({ photographer }) => {
  const [showInquiry, setShowInquiry] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.profileCard}>
        <div className={styles.profileLeft}>
          <img
            src={
              photographer.profilePic || getPlaceholderImage(photographer.id)
            }
            onError={(e) =>
              ((e.currentTarget as HTMLImageElement).src = getPlaceholderImage(
                photographer.id
              ))
            }
            alt={photographer.name}
            loading="lazy"
            className={styles.profilePic}
          />
          <div className={styles.rating}>
            <span style={{ color: "#ecc94b" }}>★</span>
            <span>{photographer.rating}</span>
          </div>
        </div>
        <div className={styles.profileRight}>
          <h1>{photographer.name}</h1>
          <div className={styles.location}>{photographer.location}</div>
          <p className={styles.bio}>{photographer.bio}</p>
          <div className={styles.badges}>
            {photographer.styles.map((style) => (
              <span key={style} className={styles.styleBadge}>
                {style}
              </span>
            ))}
            {photographer.tags.map((tag) => (
              <span key={tag} className={styles.tagBadge}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.price}>
            Starting at ₹{photographer.price.toLocaleString()}
          </div>
          <button
            onClick={() => setShowInquiry(true)}
            className={styles.inquiryBtn}
          >
            Send Inquiry
          </button>
        </div>
      </div>
      <div className={styles.gallerySection}>
        <h2>Gallery</h2>
        <div className={styles.galleryGrid}>
          {photographer.portfolio.map((img, i) => (
            <img
              key={i}
              src={img.replace(".jpg", ".svg")}
              alt="Portfolio"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src =
                  getPlaceholderImage(i + 1))
              }
              loading="lazy"
              className={styles.galleryImage}
            />
          ))}
        </div>
      </div>
      <div className={styles.reviewSection}>
        <h2>Reviews</h2>
        <div className={styles.reviewList}>
          {photographer.reviews.map((review, i) => (
            <div key={i} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span>{review.name}</span>
                <span style={{ color: "#ecc94b" }}>★</span>
                <span>{review.rating}</span>
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
              <div className={styles.reviewComment}>{review.comment}</div>
            </div>
          ))}
        </div>
      </div>
      {showInquiry && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <button
              onClick={() => setShowInquiry(false)}
              className={styles.modalClose}
            >
              ✕
            </button>
            <h3>Send Inquiry</h3>
            <form
              className={styles.inquiryForm}
              onSubmit={(e) => {
                e.preventDefault();
                setShowInquiry(false);
              }}
            >
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Message" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
