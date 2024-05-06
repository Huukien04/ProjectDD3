import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';


const data = [
  {
    singer: 'Noo Phước Thịnh',
    songs: [
      { id: 1, name: 'Thương em là điều anh không thể ngờ', image: require('../image/noo.png'), singer: 'Noo Phước Thịnh' },
      { id: 3, name: 'Là bạn không thể yêu', image: require('../image/louhoang.png'), singer: 'Lou Hoàng' },
    ]
  },
  {
    singer: 'Amee',
    songs: [
      { id: 2, name: 'Sao anh chưa về', image: require('../image/amee.png'), singer: 'Amee' },
    ]
  },
  {
    singer: 'Lou Hoàng',
    songs: [
      { id: 3, name: 'Là bạn không thể yêu', image: require('../image/louhoang.png'), singer: 'Lou Hoàng' },
    ]
  },
  {
    singer: 'MR Siro',
    songs: [
      { id: 4, name: 'Cô đơn không muốn về nhà', image: require('../image/mrsiro.png'), singer: 'MR Siro' },
    ]
  },
  {
    singer: 'Quân AP',
    songs: [
      { id: 5, name: 'Bông hoa đẹp nhất', image: require('../image/quanap.png'), singer: 'Quân AP' },
    ]
  },
  // Thêm các ca sĩ khác
];

const SongItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.songItem}>
      <Image source={item.image} style={styles.songImage} />
      <View style={styles.songDetails}>
        <Text style={styles.songName}>{item.name}</Text>
        <Text style={styles.singerName}>{item.singer}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const [currentSongs, setCurrentSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSinger, setNewSinger] = useState('');
  const [newSongName, setNewSongName] = useState('');
  const [newSongImage, setNewSongImage] = useState(null);

  const handleSingerPress = (songs) => {
    setCurrentSongs(songs);
  };
  const handleAllSongsPress = () => {
    const allSongs = data.reduce((acc, curr) => {
      acc.push(...curr.songs);
      return acc;
    }, []);
    setCurrentSongs(allSongs);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filteredSongs = [];
    data.forEach((item) => {
      const filteredBySinger = item.songs.filter((song) => song.name.toLowerCase().includes(text.toLowerCase()));
      filteredSongs.push(...filteredBySinger);
    });
    setCurrentSongs(filteredSongs);
  };

  const handleAddSinger = () => {
    if (newSinger.trim() !== '') {
      const existingSinger = data.find((singer) => singer.singer === newSinger.trim());
      if (!existingSinger) {
        const newSingerData = {
          singer: newSinger.trim(),
          songs: [],
        };
        data.push(newSingerData);
        setNewSinger('');
      } else {
        alert('Ca sĩ đã tồn tại');
      }
    } else {
      alert('Vui lòng nhập tên ca sĩ');
    }
  };

  const handleAddNewSong = () => {
    if (newSongName.trim() !== '' && newSongImage !== null) {
      const existingSinger = data.find((singer) => singer.singer === newSinger.trim());
      if (existingSinger) {
        const newSong = {
          id: existingSinger.songs.length + 1,
          name: newSongName.trim(),
          image: newSongImage,
          singer: newSinger.trim(),
        };
        existingSinger.songs.push(newSong);
        setNewSongName('');
        setNewSongImage(null);
      } else {
        alert('Vui lòng chọn một ca sĩ từ danh sách hoặc thêm ca sĩ mới');
      }
    } else {
      alert('Vui lòng nhập tên bài hát và chọn ảnh bài hát');
    }
  };

  const handleChooseImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setNewSongImage(response.uri);
      }
    });
  };

  return (
    
    <View style={styles.container}>
        <TouchableOpacity style={styles.addSingerButton} >
          <Icon name="chevron-left" size={24} color="black" style={styles.icontrove} />
        </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Nhập từ khóa tìm kiếm"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <View>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.a} onPress={() => handleSingerPress(item.songs)}>
              <Text style={styles.singerItem}>{item.singer}</Text>
            </TouchableOpacity>
          )}
          ListHeaderComponent={(
            <TouchableOpacity style={styles.a} onPress={handleAllSongsPress}>
              <Text style={styles.singerItem}>Tất cả</Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={(
            <TouchableOpacity style={styles.a} onPress={handleAddSinger}>
              <Icon name='plus' style={styles.singerItem}>Thêm</Icon>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <FlatList
          horizontal
          data={currentSongs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <SongItem key={index} item={item} />}
        />
      </View>
      {/* <TextInput
        style={styles.searchInput}
        placeholder="Nhập tên ca sĩ"
        value={newSinger}
        onChangeText={setNewSinger}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Nhập tên bài hát"
        value={newSongName}
        onChangeText={setNewSongName}
      />
      <Button title="Chọn ảnh bài hát" onPress={handleChooseImage} />
      <Button title="Thêm bài hát" onPress={handleAddNewSong} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#220000',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  a: {
    marginTop: 10,
    marginBottom: 10,
  },
  singerItem: {
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    borderColor: 'red',
    borderWidth: 2,
  },
  songItem: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    width: 130,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2,
  },
  songImage: {
    width: 50,
    height: 60,
    borderRadius: 20,
  },
  songDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  songName: {
    color: 'white',
  },
  singerName: {
    color: 'gray',
    marginTop: 5,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 10,
    paddingLeft: 10,
  },
});

export default HomeScreen;
