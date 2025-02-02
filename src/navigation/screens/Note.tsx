import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NoteStackParamList = {
  NoteDetail: {
    passProps: {
      id: string;
      note: string;
      date: string;
      image: string;
    };
  };
};

var MOCK_DATA = [
    {
        id: '1',
        note: '恭喜您！完成第一次鐵人三項比賽\n繼續保持這份熱情,你一定能創造更多佳績!',
        date: '2020/01/28 14:00',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=happy' }
    },
    {
        id: '2',
        note: '恭喜您！達成游泳1000公尺里程碑\n堅持就是成功的關鍵,你做到了!',
        date: '2020/02/02 12:00',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=excited' }
    },
    {
        id: '3',
        note: '恭喜您！完成玉山主峰健行挑戰\n登頂的感覺真好,期待你的下一個高峰!',
        date: '2020/02/17',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=proud' }
    },
    {
        id: '4',
        note: '恭喜您！連續30天完成瑜伽課程\n養成好習慣不容易,你的毅力令人欽佩!',
        date: '2020/03/28 14:00',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=peaceful' }
    },
    {
        id: '5',
        note: '恭喜您！完成馬拉松全程42.195公里\n每一步都是對自我的超越,太棒了!',
        date: '2020/04/02 12:00',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=accomplished' }
    },
    {
        id: '6',
        note: '恭喜您！達成自行車環島一周\n用雙輪丈量台灣的美,為你喝采!',
        date: '2020/04/17',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=joyful' }
    },
    {
        id: '7',
        note: '恭喜您！完成50次CrossFit訓練\n堅持不懈的精神值得學習,繼續加油!',
        date: '2020/08/28 14:00',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=energetic' }
    },
    {
        id: '8',
        note: '恭喜您！完成100次健身房重訓課程\n持之以恆的力量令人敬佩,你是最棒的!',
        date: '2020/09/02 12:00',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=strong' }
    },
    {
        id: '9',
        note: '恭喜您！完成首次攀岩認證\n克服恐懼的勇氣令人欽佩,繼續挑戰自我!',
        date: '2020/09/17',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=brave' }
    },
    {
        id: '10',
        note: '恭喜您！達成30天普拉提挑戰\n保持良好的運動習慣,你已經做得很好了!',
        date: '2020/09/28 14:00',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=satisfied' }
    },
    {
        id: '11',
        note: '恭喜您！完成第一次水肺潛水認證\n探索海洋的勇氣可嘉,期待你的更多冒險!',
        date: '2020/10/02 12:00',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=adventurous' }
    },
    {
        id: '12',
        note: '恭喜您！完成百岳入門-七星山登頂\n這只是開始,相信你能征服更多高峰!',
        date: '2020/12/17',
        image: { uri: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=confident' }
    },

]

export function Note() {
    const navigation = useNavigation<NativeStackNavigationProp<NoteStackParamList>>();
    const [dataSource, setDataSource] = useState<Array<any>>([]);
    
    useEffect(() => {
        const noteData = MOCK_DATA;
        setDataSource(noteData);
    }, []); // 僅在組件首次渲染時執行
    
    const showNoticeDetail = (cases: any) => {
        navigation.navigate('NoteDetail', { passProps: cases });
    }

    const renderBook = (cases: any) => {
        return (
            <TouchableOpacity onPress={() => showNoticeDetail(cases)}>
                <View>

                    <View style={styles.MainView}>
                        <Image source={cases.image} style={styles.image} />

                        <View style={{ flex: 1 }}>

                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ color: 'black', fontSize: 15, marginTop: 8 }}>
                                {cases.note}
                            </Text>

                            <Text ellipsizeMode='tail' numberOfLines={3} style={{ marginTop: 8, fontSize: 13, marginBottom: 8 }}>
                                {cases.date}
                            </Text>
                        </View>
                        <Image source={require('../../assets/img/ic_arrow_right.png')} style={styles.image} />

                    </View>
                    <View style={styles.seperator} />

                </View>
            </TouchableOpacity>

        )

    }

    return (
        <View>
            <FlatList
                data={dataSource}
                renderItem={cases => renderBook(cases.item)}
                keyExtractor={cases => cases.id}
                style={{ backgroundColor: 'white' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MainView: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8
    },
    seperator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    image: {
        width: 20,
        height: 40
    }
});
