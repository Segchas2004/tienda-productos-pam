import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Product } from './infrastructure/interfaces/product.interface';
import { getProductsAction } from './services/actions/get-products.action';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getProductsAction();
      setProducts(result);
    } catch {
      setError('No se pudieron cargar los productos. Revisa tu conexion.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.header}>Mi tienda</Text>
      {selected ? (
        <ScrollView contentContainerStyle={styles.detail}>
          <Pressable style={styles.button} onPress={() => setSelected(null)}>
            <Text style={styles.buttonText}>Volver a productos</Text>
          </Pressable>
          <Image source={{ uri: selected.imagen }} style={styles.detailImage} resizeMode="contain" />
          <Text style={styles.title}>{selected.nombre}</Text>
          <Text style={styles.price}>S/ {selected.precio.toFixed(2)}</Text>
          <Text style={styles.category}>Categoria: {selected.categoria}</Text>
          <Text style={styles.description}>{selected.descripcion}</Text>
        </ScrollView>
      ) : loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#166534" /><Text>Cargando productos...</Text></View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.message}>{error}</Text>
          <Pressable onPress={loadProducts} style={styles.button}><Text style={styles.buttonText}>Reintentar</Text></Pressable>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text>No hay productos disponibles.</Text>}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => setSelected(item)}>
              <Image source={{ uri: item.imagen }} style={styles.image} resizeMode="contain" />
              <View style={styles.info}>
                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.price}>S/ {item.precio.toFixed(2)}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9', paddingTop: 36 },
  header: { fontSize: 26, fontWeight: 'bold', padding: 18, color: '#166534' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  message: { textAlign: 'center', fontSize: 16 },
  list: { padding: 16, paddingBottom: 32 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 14, alignItems: 'center' },
  image: { width: 90, height: 110 },
  info: { flex: 1, marginLeft: 16 },
  name: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 21, fontWeight: 'bold', color: '#166534', marginTop: 12 },
  detail: { padding: 20, paddingBottom: 40 },
  detailImage: { width: '100%', height: 280, marginVertical: 24, backgroundColor: '#fff' },
  title: { fontSize: 23, fontWeight: 'bold' },
  category: { fontSize: 16, marginVertical: 16, color: '#475569' },
  description: { fontSize: 16, lineHeight: 25 },
  button: { backgroundColor: '#166534', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});


