const [data, setData] = useState([]);
useEffect(() => {
const getData = async () => {
await fetch("https://example-data.draftbit.com/products")
.then((response) => response.json())
.then((response) => setData(response));
};
getData();
}, []);

const categoryCounts = {};

data.forEach((item) => {
const category = item.category;
categoryCounts[category] = (categoryCounts[category] || 0) + 1;
});

const sortedData = Object.fromEntries(
Object.entries(categoryCounts).sort(([, a], [, b]) => b - a)
);
