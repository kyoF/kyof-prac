import random

def ask_digit():
    while True:
        digit = input('select digit 3 or 4:')
        if digit in ('3', '4'):
            return int(digit)
        print('please select 3 or 4')

def play(digit, enemy_hand):
    history = []
    eat = 0
    while eat != digit:
        my_hand = check_my_hand(digit)
        eat, bite = check_eat_bite(enemy_hand, my_hand)
        history.append((my_hand, eat, bite))
        show_history(history, enemy_hand)
    return len(history)

def check_my_hand(digit):
    while True:
        my_hand = input(f'type {digit} digit number:')
        if not my_hand.isdigit():
            print('please type integer number')
        elif len(my_hand) != digit:
            print('wrong digit')
        elif len(set(my_hand)) != digit:
            print('already same number in your hand')
        else:
            return my_hand

def check_eat_bite(enemy_hand, my_hand):
    eat = sum(e == m for (e, m) in zip(enemy_hand, my_hand))
    bite = sum(m in enemy_hand for (e, m) in zip(enemy_hand, my_hand) if e != m)
    return eat, bite

def show_history(history, enemy_hand):
    # 敵の手札
    print('-----enemy hand----')
    print(*enemy_hand, sep='-')
    print('-----your hand-----')
    for my_hand, eat, bite in history:
        print(*my_hand, sep='-')
        print(f'<EAT:{eat}>')
        print(f'<BITE:{bite}>')
        print('-------------------')

def show_win_message(turn):
    print('WIIIIIIIIIIIIN!!!')
    print(f'you won in {turn}')


def main():
    digit = ask_digit()
    enemy_hand = random.sample('0123456789', digit)
    turn = play(digit, enemy_hand)
    show_win_message(turn)

if __name__ == '__main__':
    main()


# import random

# # my_list[
# #       [number, eat_flg, bite_flg],
# #       [number, eat_flg, bite_flg],
# #       [number, eat_flg, bite_flg],
# # ]
# # enemy_list[
# #       number, 
# #       number, 
# #       number
# # ]
# # history_list[
# #       [number, number, number, eat_count, bite_count],
# # ]

# eat = 1 # eatフラグのindx番号
# bite = 2 # biteフラグのindx番号
# win_flg = False # 勝利フラグ
# history_list = []
# loop_count = 0

# digit_flag = False # 桁数が正しく入力されているかのフラグ
# while digit_flag == False:
#     digit = input('select digit:')
#     if digit == '3':
#         int_digit = 3
#         digit_flag = True
#     elif digit == '4':
#         int_digit = 4
#         digit_flag = True
#     else:
#         print('please select 3 or 4')
#         continue

# # 敵の手札生成
# enemy_list = []
# while len(enemy_list) < int_digit:
#     n = random.randint(0, 9)
#     if not n in enemy_list:
#         enemy_list.append(n)

# # 勝つまで繰り返し
# while win_flg == False:

#     eat_count = 0 # EATカウント
#     bite_count = 0 # BITEカウント
#     i = 0 # LOOP変数
#     my_list = []
#     history_list.append([])
#     tmp_my_list = []

#     input_flg = False # 正しい数字が入力されているかのフラグ
#     while input_flg == False:

#         num = input(f'type {digit} number:')

#         # 整数チェック
#         try :
#             int(num)
#             tmp_my_list = list(num)
#         except ValueError:
#             print('type number')
#             continue

#         # 桁数チェック
#         if not len(tmp_my_list) == int_digit:
#             print('match digit')
#             continue

#         # 同じ数字が入力されていないかチェック
#         if not len(sorted(set(tmp_my_list), key=tmp_my_list.index)) == int_digit:
#             print("don't type same number")
#             continue
        
#         # 判定に使用するリストと履歴として使用するリストに代入
#         for num in tmp_my_list:
#             my_list.append([])
#             my_list[i].append(int(num))
#             # eat_flag
#             my_list[i].append(0)
#             # bite_flag
#             my_list[i].append(0)
#             # 記録
#             history_list[loop_count].append(my_list[i][0])
#             i += 1

#         input_flg = True

#     # EATか判定
#     for (my_item, enemy_item) in zip(my_list, enemy_list):
#         if my_item[0] == enemy_item:
#             eat_count += 1
#             my_item[eat] = 1

#     # BITEか判定
#     for my_item in my_list:
#         for enemy_item in enemy_list:
#             if my_item[eat] != 1:
#                 if my_item[0] == enemy_item:
#                     bite_count += 1
#                     my_item[bite] = 1
    
#     # 履歴にEATとBITEを記録
#     history_list[loop_count].append(eat_count)
#     history_list[loop_count].append(bite_count)

#     # EATが桁数と同じになったら終了
#     if eat_count == int_digit:
#         win_flg = True

#     # 敵の手札
#     # print('-----enemy hand----')
#     # print(*enemy_list, sep='-')
#     # 自分の状況
#     print('-----your hand-----')
#     for print_list in history_list:
#         print(*print_list[0:int_digit], sep='-')
#         print(f'<EAT:{print_list[int_digit]}>')
#         print(f'<BITE:{print_list[int_digit+1]}>')
#         print('-------------------')

#     # 何回目で勝利したかカウント
#     loop_count += 1

# print('WIIIIIIIIIIIIN!!!')
# print(f'you won in {loop_count} turn')

# import random
# int_digit = 3
# enemy_list = []
# for _ in range(int_digit+1):
#     n = random.randint(0, 9)
#     if n in enemy_list:
#         int_digit += 1
#         continue
#     enemy_list.append(n)
# print(enemy_list)
