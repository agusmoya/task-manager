import { useSearch } from "../../hooks/useSearch";
import { Category, CountingCategories } from "../../../types/types";

import "./Categories.css";

interface Props {
  categories: Category[];
}

export function Categories({ categories = [] }: Props) {
  const { search } = useSearch();

  const organizedCategories: { [key: string]: CountingCategories } = {};

  categories.forEach((cat) => {
    const { name } = cat;
    if (!organizedCategories[name]) {
      organizedCategories[name] = {
        ...cat,
        quantity: 1,
      };
    } else {
      organizedCategories[name].quantity++;
    }
  });

  const filteredCategories = Object.values(organizedCategories).filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const areCategoriesPresent = filteredCategories.length;

  return (
    <section className="categories section" id="categories">
      <div className="categories__container container">
        <header className="categories__header">
          <h2 className="section__title">Categories</h2>
          <a>See all</a>
        </header>
        <ul
          className={`categories__list ${
            !areCategoriesPresent ? "categories__list--no-result" : ""
          }`}
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <li className="category__item" key={cat.id}>
                <h3 className="section__subtitle">{cat.name}</h3>
                <small>{cat.quantity} task(s)</small>
              </li>
            ))
          ) : (
            <span>No categories found...</span>
          )}
        </ul>
      </div>
    </section>
  );
}
