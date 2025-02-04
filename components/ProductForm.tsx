// ... existing code ...

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number.parseFloat(value) || 0;

    setData((prev) => {
      const newData = { ...prev, [name]: numValue };

      // Calculate total whenever quantity, price, or profit changes
      if (name === "quantity" || name === "price" || name === "profit") {
        newData.total = calculateTotal(
          name === "quantity" ? numValue : prev.quantity,
          name === "price" ? numValue : prev.price,
          name === "profit" ? numValue : prev.profit
        );
      }

      return newData;
    });
    setIsApiData(false);
  };

// ... existing code ...
