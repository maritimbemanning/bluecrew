import React from 'react';
import * as styles from './StorySection.css';
import * as util from '../../../styles/utils.css';

export function StorySection(){
  return (
    <section className={styles.section} aria-labelledby="story-heading">
      <div className={util.container}>
        <h2 id="story-heading" className={styles.storyTitle}>Våre historier</h2>
        <div className={styles.grid}>
          <article>
            <h3 className={styles.storyTitle}>Fra usikker til trygg</h3>
            <p className={styles.storyText}>Kort tekst som forklarer story …</p>
          </article>
          <article>
            <h3 className={styles.storyTitle}>Hvorfor kunder velger oss</h3>
            <p className={styles.storyText}>Kort tekst som forklarer resultater …</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
