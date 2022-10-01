window.eurIT = Intl.NumberFormat('it-IT', {style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2});
import { AccountButton } from '/front/components/AccountButton.js'
customElements.define('ah-accountbutton', AccountButton);
import { Product } from '/front/components/Product.js'
customElements.define('ah-product', Product);
import { ProductCard } from '/front/components/ProductCard.js'
customElements.define('ah-productcard', ProductCard);
import { ProductPill } from '/front/components/ProductPill.js'
customElements.define('ah-productpill', ProductPill);
