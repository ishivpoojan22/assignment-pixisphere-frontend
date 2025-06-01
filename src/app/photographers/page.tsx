"use client";
import React, { useEffect, useState, useMemo } from "react";
import { usePhotographerStore } from "@/store/photographers";
import PhotographerCard from "@/components/PhotographerCard";
import FiltersSidebar from "@/components/FiltersSidebar";
import SearchBar from "@/components/SearchBar";
import styles from "./photographers.module.css";

const allStyles = ["Traditional", "Candid", "Studio", "Outdoor", "Indoor"];

const PhotographersPage = () => {
  const { photographers, fetchPhotographers } = usePhotographerStore();

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [rating, setRating] = useState(0);
  const [stylesFilter, setStylesFilter] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("recent");
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(photographers);
  const availableCities = useMemo(
    () => Array.from(new Set(photographers.map((p) => p.location))),
    [photographers]
  );

  useEffect(() => {
    fetchPhotographers();
  }, [fetchPhotographers]);

  useEffect(() => {
    let result = [...photographers];
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (rating) result = result.filter((p) => p.rating >= rating);
    if (stylesFilter.length)
      result = result.filter((p) =>
        stylesFilter.some((s) => p.styles.includes(s))
      );
    if (city)
      result = result.filter(
        (p) => p.location.toLowerCase() === city.toLowerCase()
      );
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.location.toLowerCase().includes(s) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(s))
      );
    }
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "rating-desc") result.sort((a, b) => b.rating - a.rating);
    if (sort === "recent") result.sort((a, b) => b.id - a.id);
    setFiltered(result);
  }, [photographers, priceRange, rating, stylesFilter, city, sort, search]);

  return (
    <div className={styles.photographersWrapper}>
      <h1 className={styles.photographersTitle}>All Photographers</h1>
      <SearchBar value={search} onChange={setSearch} />
      <div style={{ display: "flex", gap: "2rem" }}>
        <FiltersSidebar
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          rating={rating}
          setRating={setRating}
          styles={stylesFilter}
          setStyles={setStylesFilter}
          city={city}
          setCity={setCity}
          sort={sort}
          setSort={setSort}
          availableStyles={allStyles}
          availableCities={availableCities}
        />
        <div className={styles.photographersGrid}>
          {filtered.map((photographer) => (
            <PhotographerCard
              key={photographer.id}
              photographer={photographer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotographersPage;
